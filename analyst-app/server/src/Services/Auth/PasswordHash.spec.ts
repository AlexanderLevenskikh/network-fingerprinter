import { createHash } from 'crypto';
import { hashPassword, isLegacyPasswordHash, verifyPassword } from './PasswordHash';

describe('password hashing and legacy credential compatibility', () => {
    const password = 'synthetic-only-password';

    it('creates salted versioned hashes and verifies them', () => {
        const first = hashPassword(password);
        const second = hashPassword(password);
        expect(first).toMatch(/^scrypt-v1\$[a-f0-9]{32}\$[a-f0-9]{128}$/);
        expect(second).not.toEqual(first);
        expect(verifyPassword(password, first)).toBe(true);
        expect(verifyPassword('wrong', first)).toBe(false);
        expect(isLegacyPasswordHash(first)).toBe(false);
    });

    it('accepts existing MD5 for transition but not malformed hashes', () => {
        const old = createHash('md5').update(password).digest('hex');
        expect(isLegacyPasswordHash(old)).toBe(true);
        expect(verifyPassword(password, old)).toBe(true);
        expect(verifyPassword('wrong', old)).toBe(false);
        expect(verifyPassword(password, 'invalid')).toBe(false);
        expect(verifyPassword(password, 'scrypt-v1$invalid$invalid')).toBe(false);
    });
});
