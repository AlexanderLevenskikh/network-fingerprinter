import { SessionSerializer } from './SessionSerializer';

describe('Passport session serialization', () => {
    const users: any = {
        findById: jest.fn().mockResolvedValue({
            userId: '00000000-0000-0000-0000-000000000001',
            userName: 'fixture', isAdmin: false, passwordHash: 'not-for-session',
        }),
    };
    const serializer = new SessionSerializer(users);

    beforeEach(() => jest.clearAllMocks());

    it('stores only an ID and reloads roles without the hash', async () => {
        const persisted = jest.fn();
        serializer.serializeUser({
            userId: '00000000-0000-0000-0000-000000000001',
            passwordHash: 'secret', isAdmin: true,
        }, persisted);
        expect(persisted).toHaveBeenCalledWith(null, '00000000-0000-0000-0000-000000000001');

        const callback = jest.fn();
        serializer.deserializeUser('00000000-0000-0000-0000-000000000001', callback);
        await new Promise(resolve => setImmediate(resolve));
        expect(users.findById).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(null, {
            userId: '00000000-0000-0000-0000-000000000001',
            userName: 'fixture', isAdmin: false,
        });
    });

    it('discards stale role and hash from historical serialized sessions', async () => {
        const callback = jest.fn();
        serializer.deserializeUser({
            userId: '00000000-0000-0000-0000-000000000001',
            isAdmin: true, passwordHash: 'leaked-old-payload',
        }, callback);
        await new Promise(resolve => setImmediate(resolve));
        expect(callback).toHaveBeenCalledWith(null, expect.objectContaining({ isAdmin: false }));
        expect(JSON.stringify(callback.mock.calls)).not.toContain('leaked-old-payload');
    });
});
