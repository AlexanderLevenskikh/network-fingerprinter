CREATE TABLE user_entity (
    user_id uuid PRIMARY KEY NOT NULL,
    user_name varchar(100) NOT NULL,
    password_hash varchar(255) NOT NULL,
    is_admin boolean NOT NULL,
    first_name varchar(100),
    last_name varchar(100),
    middle_name varchar(100)
);

INSERT INTO user_entity (user_id, user_name, password_hash, is_admin)
SELECT '00000000-0000-0000-0000-000000000000', 'root', '63a9f0ea7bb98050796b649e85481845', true
WHERE NOT EXISTS (SELECT * FROM user_entity)
