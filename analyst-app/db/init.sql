-- Runs only on the first initialization of a fresh PostgreSQL named volume.
-- Bootstrap credentials are applied in 20-bootstrap-admin.sh, not hardcoded.
CREATE TABLE IF NOT EXISTS user_entity (
    userid uuid PRIMARY KEY NOT NULL,
    username varchar(100) NOT NULL,
    passwordhash varchar(255) NOT NULL,
    isadmin boolean NOT NULL,
    firstname varchar(100),
    lastname varchar(100),
    middlename varchar(100)
);
