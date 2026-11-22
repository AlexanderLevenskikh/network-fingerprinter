import { createHash, randomBytes, scrypt, timingSafeEqual } from 'crypto';

const PREFIX = 'scrypt-v2';
// OWASP scrypt minimum: N=2^17, r=8, p=1 (~128 MiB per computation).
// Keep a bounded number of tasks off the event loop and in the libuv worker pool.
const OPTIONS = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };
const KEY_LENGTH = 64;
const MAX_PASSWORD_BYTES = 1024;
const MAX_WAITERS = 4;
let busy = false;
const waiters: Array<() => void> = [];

async function acquire(): Promise<void> {
    if (!busy) {
        busy = true;
        return;
    }
    if (waiters.length >= MAX_WAITERS) {
        throw new Error('Password hashing capacity exhausted');
    }
    await new Promise<void>(resolve => waiters.push(resolve));
}

function release(): void {
    const next = waiters.shift();
    if (next) { next(); }
    else { busy = false; }
}

async function derive(password: string, salt: Buffer, options = OPTIONS): Promise<Buffer> {
    await acquire();
    try {
        return await new Promise<Buffer>((resolve, reject) => {
            scrypt(password, salt, KEY_LENGTH, options, (error, key) => {
                if (error) { reject(error); }
                else { resolve(key); }
            });
        });
    } finally {
        release();
    }
}

export async function hashPassword(password: string): Promise<string> {
    if (typeof password !== 'string' || Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES) {
        throw new Error('Invalid password length');
    }
    const salt = randomBytes(16);
    const key = await derive(password, salt);
    return PREFIX + '$' + salt.toString('hex') + '$' + key.toString('hex');
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
    if (typeof password !== 'string' || typeof stored !== 'string' ||
        Buffer.byteLength(password, 'utf8') > MAX_PASSWORD_BYTES) {
        return false;
    }
    const pieces = stored.split('$');
    if (pieces.length === 3 && /^[a-f0-9]{32}$/.test(pieces[1]) &&
        /^[a-f0-9]{128}$/.test(pieces[2])) {
        if (pieces[0] !== PREFIX && pieces[0] !== 'scrypt-v1') {
            return false;
        }
        // v1 used Node's legacy default parameters; accept only to rehash on login.
        const params = pieces[0] === 'scrypt-v1'
            ? { N: 16384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 }
            : OPTIONS;
        const actual = await derive(password, Buffer.from(pieces[1], 'hex'), params);
        return timingSafeEqual(actual, Buffer.from(pieces[2], 'hex'));
    }
    if (isLegacyPasswordHash(stored)) {
        const actual = createHash('md5').update(password).digest();
        return timingSafeEqual(actual, Buffer.from(stored, 'hex'));
    }
    return false;
}

export function isLegacyPasswordHash(stored: string): boolean {
    return typeof stored === 'string' && /^[a-f0-9]{32}$/i.test(stored);
}

export function needsPasswordRehash(stored: string): boolean {
    return isLegacyPasswordHash(stored) || stored.indexOf('scrypt-v1$') === 0;
}

export function isHistoricalDefaultCredential(username: string, stored: string): boolean {
    // Legacy UserService used exactly username root and password root on empty tables.
    // Block it rather than turning an attacker-known password into a valid new scrypt hash.
    return username === 'root' && stored.toLowerCase() === '63a9f0ea7bb98050796b649e85481845';
}
