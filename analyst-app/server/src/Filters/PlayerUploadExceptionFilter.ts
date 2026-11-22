import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { AuthExceptionFilter } from './AuthExceptionsFilter';

// Multer 2 / busboy reject malformed multipart framing with ordinary Errors.
// Nest 6 only converts known MulterError codes to HttpException; otherwise it
// reports HTTP 500. Turn only recognized parser framing failures into HTTP 400.
@Catch()
export class PlayerUploadExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        if (exception instanceof HttpException) {
            return new AuthExceptionFilter().catch(exception, host);
        }
        const message = exception && exception.message;
        if (message === 'Unexpected end of form' ||
            message === 'Multipart: Boundary not found' ||
            message === 'Unexpected end of multipart data') {
            return host.switchToHttp().getResponse<Response>()
                .status(400).json({ statusCode: 400, message: 'Malformed multipart form data' });
        }
        // Preserve a generic server error for unrelated faults; never expose
        // internal exception details to clients.
        console.error('Unexpected PCAP upload error', exception);
        return host.switchToHttp().getResponse<Response>()
            .status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
}
