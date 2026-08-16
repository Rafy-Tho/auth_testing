CREATE TABLE role_permissions(
    role_id INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INTEGER NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY(role_id,permission_id)
);

CREATE INDEX idx_role_permissions_role_id ON role_permissions (role_id);
  
INSERT INTO role_permissions (role_id, permission_id) 
SELECT r.id,p.id
from roles r, permissions p
WHERE r.name = 'admin'
AND p.name IN('users:create','users:read','users:update','users:delete','roles:manage','sessions:read','sessions:delete','audit:read');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id,p.id
FROM roles r, permissions p
WHERE r.name = 'super_admin'
AND p.name IN ('users:create','users:read','users:update','users:delete','roles:manage','sessions:read','sessions:delete','audit:read');

INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.name = 'moderator'
AND p.name IN ('users:read');