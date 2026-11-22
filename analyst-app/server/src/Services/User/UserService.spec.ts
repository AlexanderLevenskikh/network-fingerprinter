import { UserService } from './UserService';

describe('UserService parameterized PostgreSQL queries', () => {
    const db = { query: jest.fn() };
    let service: UserService;

    beforeEach(() => {
        db.query.mockReset();
        service = new UserService();
        (service as any).pool = db;
    });

    it('uses a bound username parameter, never concatenated SQL', async () => {
        db.query.mockResolvedValue({ rows: [] });
        expect(await service.findOne("user's name")).toBeUndefined();
        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('WHERE username = $1'), ["user's name"],
        );
    });

    it('never queries on invalid session identifiers', async () => {
        expect(await service.findById('not-a-uuid')).toBeUndefined();
        expect(db.query).not.toHaveBeenCalled();
    });

    it('returns an expected delete result without interpolating the identifier', async () => {
        db.query.mockResolvedValue({ rowCount: 1 });
        expect(await service.remove('11111111-1111-1111-1111-111111111111'))
            .toEqual({ raw: [], affected: 1 });
        expect(db.query).toHaveBeenCalledWith(
            expect.stringContaining('userid = $1'), ['11111111-1111-1111-1111-111111111111'],
        );
    });
});