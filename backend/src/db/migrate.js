import { readdir, readFile, access } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import { config } from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new pg.Pool({
    connectionString: config.DATABASE_URL,
})

async function ensureMigrationsTable(client) {
    await client.query(`
        CREATE TABLE IF NOT EXISTS migrations(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            applied_at TIMESTAMP WITH TIME ZONE 
            DEFAULT NOW()
        );
        `);
}

async function getAppliedMigrations(client) {
    const result = await client.query(`
        SELECT name FROM migrations ORDER BY id
        `)
    return new Set(result.rows.map(r => r.name))
}

async function migrate() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        await ensureMigrationsTable(client)

        const applied = await getAppliedMigrations(client)
        const migrationsDir = join(__dirname, 'migrations')
        const files = (await readdir(migrationsDir)).filter(f => f.endsWith('.sql')).sort()

        let count = 0
        for (const file of files) {
            if (applied.has(file)) continue
            const filePath = join(migrationsDir, file)
            const sql = await readFile(filePath, 'utf-8')
            console.log(`Applying: ${file}`)
            await client.query(sql)
            await client.query(`INSERT INTO migrations (name) VALUES ($1)`, [file])
            count++
        }
        await client.query('COMMIT')
        console.log(`Done. ${count} migrations applied`)
    } catch (err) {
        await client.query('ROLLBACK')
        console.error('Migration failed', err.message)
        process.exit(1)
    } finally {
        client.release()
        await pool.end()
    }
}

async function rollback() {
    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        await ensureMigrationsTable(client)

        const result = await client.query(`
          SELECT name FROM migrations ORDER BY id DESC LIMIT 1
            `)

        if (result.rows.length === 0) {
            console.log('No migrations to rollback')
            await client.query('COMMIT')
            return
        }

        const lastMigration = result.rows[0].name
        console.log(`Rolling backL: ${lastMigration}`)

        const rollbackFile = lastMigration.replace('.sql', '.rollback.sql')

        const rollbackPath = join(__dirname, 'migrations', rollbackFile)

        try {
            await access(rollbackPath)
            const sql = await readFile(rollbackPath, 'utf-8')
            await client.query(sql)
        } catch {
            console.log(
                `No rollback file found for ${lastMigration}. Removing migration record only.`,
            );
        }

        await client.query(`
            DELETE FROM migrations WHERE name = $1
            `, [lastMigration])

        await client.query('COMMIT')
        console.log("Rollback complete")
    } catch (err) {
        await client.query('ROLLBACK')
        console.error("Rollback failed:", err.message);
        process.exit(1);
    } finally {
        client.release();
        await pool.end();
    }
}

const command = process.argv[2]
if (command === 'rollback') rollback()
else migrate()