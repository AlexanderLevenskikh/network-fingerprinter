import { createHash } from 'crypto';
import { hashPassword, isHistoricalDefaultCredential, isLegacyPasswordHash, verifyPassword } from './PasswordHash';

describe('password hashing and legacy credential compatibility', () => {
    const password = 'synthetic-only-password';

    it('creates random salted, explicit-parameter scrypt hashes', async () => {
        const first = await hashPassword(password);
        const second = await hashPassword(password);
        expect(first).toMatch(/^scrypt-v2\$[a-f0-9]{32}\$[a-f0-9]{128}$/);
        expect(second).not.toEqual(first);
        expect(await verifyPassword(password, first)).toBe(true);
        expect(await verifyPassword('wrong', first)).toBe(false);
        expect(isLegacyPasswordHash(first)).toBe(false);
    });

    it('supports legitimate MD5 transition without changing invalid credentials', async () => {
        const old = createHash('md5').update(password).digest('hex');
        expect(isLegacyPasswordHash(old)).toBe(true);
        expect(await verifyPassword(password, old)).toBe(true);
        expect(await verifyPassword('wrong', old)).toBe(false);
        expect(await verifyPassword(password, 'invalid')).toBe(false);
        expect(await verifyPassword(password, 'scrypt-v2$invalid$invalid')).toBe(false);
    });

    it('recognizes historical root/root as unsafe', () => {
        expect(isHistoricalDefaultCredential('root', createHash('md5').update('root').digest('hex'))).toBe(true);
        expect(isHistoricalDefaultCredential('root', createHash('md5').update('other').digest('hex'))).toBe(false);
        expect(isHistoricalDefaultCredential('other', createHash('md5').update('root').digest('hex'))).toBe(false);
    });
});
