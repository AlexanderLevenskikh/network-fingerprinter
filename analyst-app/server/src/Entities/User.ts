// Row shape of the existing PostgreSQL user_entity table.
// The schema is initialized by the SQL bootstrap, not inferred from decorators.
export class UserEntity {
    userid: string;
    username: string;
    passwordhash: string;
    isadmin: boolean;
    firstname: string | null;
    lastname: string | null;
    middlename: string | null;
}