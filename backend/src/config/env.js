import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    PORT: z.coerce.number().default(5000),
    DATABASE_URL: z.string().url(),
    SESSION_SECRET: z.string().min(32),
    CLIENT_URL: z.string().url(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number().default(587),
    SMTP_USER: z.string(),
    SMTP_PASSWORD: z.string().min(8),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    console.error('Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors)
    process.exit(1)
}

export const config = parsed.data