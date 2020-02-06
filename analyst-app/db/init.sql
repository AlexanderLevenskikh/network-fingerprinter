CREATE TABLE user_entity (
    userId uuid PRIMARY KEY NOT NULL,
    userName varchar(100) NOT NULL,
    passwordHash varchar(255) NOT NULL,
    isAdmin boolean NOT NULL,
    firstName varchar(100),
    lastName varchar(100),
    middleName varchar(100)
);

INSERT INTO user_entity (userId, userName, passwordHash, isAdmin)
SELECT '00000000-0000-0000-0000-000000000000', 'root', '63a9f0ea7bb98050796b649e85481845', true
WHERE NOT EXISTS (SELECT * FROM user_entity)
