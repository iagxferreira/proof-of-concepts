CREATE TABLE IF NOT EXISTS users
(
    id         TEXT         NOT NULL,
    first_name VARCHAR(250) NOT NULL,
    last_name  VARCHAR(250) NOT NULL,
    email      VARCHAR(250) NOT NULL,
    password   TEXT         NOT NULL,
    deleted_at DATE DEFAULT NULL,
    created_at DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at DATE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS permissions
(
    id          TEXT NOT NULL,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    deleted_at  DATE DEFAULT NULL,
    created_at  DATE DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS roles
(
    id          TEXT NOT NULL,
    name        TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY (id)
);

CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_permissions_name ON permissions (name);
CREATE INDEX idx_roles_name ON roles (name);

CREATE TABLE IF NOT EXISTS users_permissions
(
    user_id       TEXT NOT NULL,
    permission_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id)
);

CREATE TABLE IF NOT EXISTS users_roles
(
    user_id TEXT NOT NULL,
    role_id TEXT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS permissions_roles
(
    role_id       TEXT NOT NULL,
    permission_id TEXT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (id),
    FOREIGN KEY (permission_id) REFERENCES permissions (id)
);