import { ForbiddenException } from '@nestjs/common';
import { UserController } from './UserController';

describe('UserController admin authorization', () => {
    const service: any = {
        findAll: jest.fn().mockResolvedValue([]),
        remove: jest.fn().mockResolvedValue({}),
        register: jest.fn().mockResolvedValue({}),
    };
    const controller = new UserController(service);

    beforeEach(() => jest.clearAllMocks());

    it('rejects a regular user from listing, creating or removing accounts', async () => {
        const regular = { isAdmin: false };
        await expect(controller.getUsersList(regular)).rejects.toThrow(ForbiddenException);
        await expect(controller.removeUser(regular, { userId: 'test-user' })).rejects.toThrow(ForbiddenException);
        await expect(controller.register(regular, { userName: 'test' } as any)).rejects.toThrow(ForbiddenException);
        expect(service.findAll).not.toHaveBeenCalled();
        expect(service.remove).not.toHaveBeenCalled();
        expect(service.register).not.toHaveBeenCalled();
    });

    it('keeps administrator operations functional', async () => {
        const admin = { isAdmin: true };
        await controller.getUsersList(admin);
        await controller.removeUser(admin, { userId: 'synthetic-user' });
        await controller.register(admin, { userName: 'synthetic-user' } as any);
        expect(service.findAll).toHaveBeenCalledTimes(1);
        expect(service.remove).toHaveBeenCalledWith('synthetic-user');
        expect(service.register).toHaveBeenCalledTimes(1);
    });
});
