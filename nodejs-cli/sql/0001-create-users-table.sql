CREATE TABLE IF NOT EXISTS github_users
(
    id         SERIAL,
    name         TEXT         NOT NULL,
    username VARCHAR(250) NOT NULL UNIQUE,
    company VARCHAR(250) NOT NULL,
    location  VARCHAR(250) NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
