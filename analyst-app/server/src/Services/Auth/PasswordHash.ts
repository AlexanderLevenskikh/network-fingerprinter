import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

// The existing passwordhash VARCHAR(255) accommodates this versioned format.
// No database migration is needed; legacy 32-character MD5 is read only.
const PREFIX = 'scrypt-v1';
const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const derived = scryptSync(password, Buffer.from(salt, 'hex'), KEY_LENGTH);
    return PREFIX + '$' + salt + '$' + derived.toString('hex');
}

export function verifyPassword(password: string, stored: string): boolean {
    if (typeof password !== 'string' || typeof stored !== 'string') {
        return false;
    }
    const pieces = stored.split('$');
    if (pieces.length === 3 && pieces[0] === PREFIX &&
        /^[a-f0-9]{32}$/.test(pieces[1]) && /^[a-f0-9]{128}$/.test(pieces[2])) {
        const actual = scryptSync(password, Buffer.from(pieces[1], 'hex'), KEY_LENGTH);
        return timingSafeEqual(actual, Buffer.from(pieces[2], 'hex'));
    }
    // Existing installations (including fresh PostgreSQL bootstrap) store MD5.
    // Verify these only to migrate on a successful login, never create new MD5.
    if (/^[a-f0-9]{32}$/i.test(stored)) {
        const actual = createHash('md5').update(password).digest();
        return timingSafeEqual(actual, Buffer.from(stored, 'hex'));
    }
    return false;
}

export function isLegacyPasswordHash(stored: string): boolean {
    return typeof stored === 'string' && /^[a-f0-9]{32}$/i.test(stored);
}
