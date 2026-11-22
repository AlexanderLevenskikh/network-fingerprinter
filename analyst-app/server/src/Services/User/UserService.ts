import { BadRequestException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { UserModel } from './UserModel';
import { UserEntity } from '../../Entities/User';
import { IUserRegistrationEvent } from './IUserRegistrationEvent';
import { isEmpty } from '../../Shared/Utils/isEmpty';
import { mapUserEntityToModel } from '../../Mappers/User/mapUserEntityToModel';
import uuid = require('uuid');
import { hashPassword, isHistoricalDefaultCredential, needsPasswordRehash, verifyPassword } from '../Auth/PasswordHash';

// The only relational data managed by Analyst is user_entity. Use parameterized
// PostgreSQL statements instead of the vulnerable TypeORM 0.2 runtime.
// Reuse the existing table/schema and keep session identifiers unchanged.
const { Pool } = require('pg');
const USER_COLUMNS = 'userid, username, passwordhash, isadmin, firstname, lastname, middlename';

@Injectable()
export class UserService implements OnModuleInit, OnModuleDestroy {
    private readonly pool = new Pool({
        host: process.env.POSTGRES_HOST,
        port: 5432,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        max: 10,
        connectionTimeoutMillis: 10000,
        idleTimeoutMillis: 30000,
    });

    async onModuleInit(): Promise<void> {
        // Do not recreate the historic root/root user or alter any existing user.
        // A transaction-scoped advisory lock serializes simultaneous first starts.
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            try {
                await client.query('SELECT pg_advisory_xact_lock(72811693)');
                const existing = await client.query('SELECT 1 FROM user_entity LIMIT 1');
                if (existing.rowCount === 0) {
                    const username = process.env.APP_ADMIN_USERNAME;
                    const password = process.env.APP_ADMIN_PASSWORD;
                    if (!username || username.length > 100 || !password || password.length < 12 ||
                        (username === 'root' && password === 'root')) {
                        throw new Error('Configured initial administrator credentials are required');
                    }
                    await client.query(
                        `INSERT INTO user_entity (${USER_COLUMNS}) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                        ['00000000-0000-0000-0000-000000000000', username,
                            await hashPassword(password), true, 'Administrator', null, null],
                    );
                }
                await client.query('COMMIT');
            } catch (error) {
                await client.query('ROLLBACK');
                throw error;
            }
        } finally {
            client.release();
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.pool.end();
    }

    public async findOne(username: string): Promise<UserModel | undefined> {
        const result = await this.pool.query(
            `SELECT ${USER_COLUMNS} FROM user_entity WHERE username = $1 LIMIT 1`, [username],
        );
        const user = result.rows[0] as UserEntity | undefined;
        return user ? mapUserEntityToModel(user) : undefined;
    }

    public async validateCredentials(username: string, password: string): Promise<UserModel | null> {
        if (typeof username !== 'string' || typeof password !== 'string') { return null; }
        const result = await this.pool.query(
            `SELECT ${USER_COLUMNS} FROM user_entity WHERE username = $1 LIMIT 1`, [username],
        );
        const user = result.rows[0] as UserEntity | undefined;
        if (!user || isHistoricalDefaultCredential(user.username, user.passwordhash) ||
            !(await verifyPassword(password, user.passwordhash))) {
            return null;
        }
        if (needsPasswordRehash(user.passwordhash)) {
            // Compare-and-swap ensures a concurrent admin password reset wins.
            await this.pool.query(
                'UPDATE user_entity SET passwordhash = $1 WHERE userid = $2 AND passwordhash = $3',
                [await hashPassword(password), user.userid, user.passwordhash],
            );
        }
        return mapUserEntityToModel(user);
    }

    public async findById(userId: string): Promise<UserModel | undefined> {
        if (typeof userId !== 'string' ||
            !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(userId)) {
            return undefined;
        }
        const result = await this.pool.query(
            `SELECT ${USER_COLUMNS} FROM user_entity WHERE userid = $1`, [userId],
        );
        const user = result.rows[0] as UserEntity | undefined;
        return user ? mapUserEntityToModel(user) : undefined;
    }

    public async findAll(): Promise<UserModel[]> {
        const result = await this.pool.query(`SELECT ${USER_COLUMNS} FROM user_entity`);
        return (result.rows as UserEntity[]).map(mapUserEntityToModel);
    }

    public async remove(userId: string): Promise<any> {
        const result = await this.pool.query('DELETE FROM user_entity WHERE userid = $1', [userId]);
        // Match TypeORM DeleteResult's response shape used by existing clients.
        return { raw: [], affected: result.rowCount };
    }

    public async register(event: IUserRegistrationEvent): Promise<any> {
        if (isEmpty(event.userName) || isEmpty(event.password)) {
            throw new BadRequestException();
        }
        const userid = uuid.v1();
        const result = await this.pool.query(
            `INSERT INTO user_entity (${USER_COLUMNS}) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING userid`,
            [userid, event.userName, await hashPassword(event.password), event.isAdmin,
                event.firstName || null, event.lastName || null, event.middleName || null],
        );
        // Never expose password hashes in insert results.
        return { identifiers: [{ userid }], generatedMaps: [], raw: result.rows };
    }
}