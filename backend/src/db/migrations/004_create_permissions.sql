CREATE TABLE permissions(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO permissions (name,description) VALUES
('users:create','Create users'),
('users:read','Read user data'),
('users:update','Update users'),
('users:delete','Delete users'),
('roles:manage','Manage roles and permissions'),
('sessions:read','View all sessions'),
('sessions:delete','Revoke any session'),
('audit:read','View audit logs');
