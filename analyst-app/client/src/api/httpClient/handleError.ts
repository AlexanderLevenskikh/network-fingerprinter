import { UnauthorizedError } from 'root/shared/model/errors/unauthorizedError';
import { InternalServerError } from 'root/shared/model/errors/internalServerError';
import { GeneralResponseError } from 'root/shared/model/errors/general';
import { ForbiddenError } from 'root/shared/model/errors/forbiddenError';
import { NotFoundError } from 'root/shared/model/errors/notFoundError';

export async function handleError<T>(response: Response) {
    const responseLocation = response.headers.get('location');
    if (responseLocation) {
        location.href = responseLocation;
        throw new UnauthorizedError();
    }

    switch (response.status) {
        case 403:
            throw new ForbiddenError({ });
        case 404:
            throw new NotFoundError({ });
        case 500:
            throw new InternalServerError();
        default:
            throw new GeneralResponseError();
    }
}
