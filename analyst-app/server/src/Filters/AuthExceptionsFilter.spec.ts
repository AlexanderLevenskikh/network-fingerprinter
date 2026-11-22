import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AuthExceptionFilter } from './AuthExceptionsFilter';

describe('AuthExceptionFilter user administration responses', () => {
    it('returns an explicit HTTP 403 for forbidden API user requests', () => {
        const json = jest.fn();
        const status = jest.fn().mockReturnValue({ json });
        const redirect = jest.fn();
        const host: any = {
            switchToHttp: () => ({
                getRequest: () => ({ path: '/api/user/register' }),
                getResponse: () => ({ status, redirect }),
            }),
        };
        new AuthExceptionFilter().catch(new ForbiddenException('Administrator privileges required'), host);
        expect(status).toHaveBeenCalledWith(403);
        expect(json).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 403 }));
        expect(redirect).not.toHaveBeenCalled();
    });

    it('retains login redirect behavior for other unauthorized pages', () => {
        const redirect = jest.fn();
        const host: any = {
            switchToHttp: () => ({
                getRequest: () => ({ path: '/api/other' }),
                getResponse: () => ({ redirect }),
            }),
        };
        new AuthExceptionFilter().catch(new UnauthorizedException(), host);
        expect(redirect).toHaveBeenCalledWith('/');
    });
});
