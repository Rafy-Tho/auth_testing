CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO roles (name, description) VALUES
('user','Default user role'),
('moderator','Can moderate content'),
('admin','Can mange users and content'),
('super_admin','Full system access');