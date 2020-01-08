CREATE TABLE "user" (
    userId uuid PRIMARY KEY NOT NULL,
    userName varchar(100) NOT NULL,
    firstName varchar(100),
    lastName varchar(100),
    middleName varchar(100),
    passwordHash varchar(255) NOT NULL,
    isAdmin boolean NOT NULL
);

INSERT INTO "user" (userId, userName, passwordHash, isAdmin)
SELECT '00000000-0000-0000-0000-000000000000', 'root', '63a9f0ea7bb98050796b649e85481845', true
WHERE NOT EXISTS (SELECT * FROM "user")
