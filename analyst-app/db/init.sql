CREATE TABLE user_entity (
    userid uuid PRIMARY KEY NOT NULL,
    username varchar(100) NOT NULL,
    passwordhash varchar(255) NOT NULL,
    isadmin boolean NOT NULL,
    firstname varchar(100),
    lastname varchar(100),
    middlename varchar(100)
);

INSERT INTO user_entity (userid, username, passwordhash, isadmin)
SELECT '00000000-0000-0000-0000-000000000000', 'root', '63a9f0ea7bb98050796b649e85481845', true
WHERE NOT EXISTS (SELECT * FROM user_entity)
