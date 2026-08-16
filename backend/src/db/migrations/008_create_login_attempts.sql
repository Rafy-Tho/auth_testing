CREATE TABLE login_attempts(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address INET NOT NULL,
    success BOOLEAN NOT NULL DEFAULT false,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_login_attempts_email_ip ON login_attempts
(email,ip_address);
CREATE INDEX idx_login_attempts_created_at ON login_attempts(created_at);