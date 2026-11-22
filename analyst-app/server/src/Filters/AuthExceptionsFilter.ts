import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof UnauthorizedException || exception instanceof ForbiddenException) {
      if (request.path && request.path.startsWith('/api/user/')) {
        const status = exception.getStatus();
        response.status(status).json({ statusCode: status, message: exception.message });
        return;
      }
      response.redirect('/');
      return;
    }

    // Upload is an API endpoint used by antd Upload. Redirects turn failures into
    // apparently successful HTTP 200 HTML responses for the browser.
    if (request.path === '/api/player/upload') {
      const status = exception.getStatus();
      const raw = exception.getResponse();
      const message = typeof raw === 'object' && raw && (raw as any).message
        ? (raw as any).message
        : exception.message;
      response.status(status).json({ statusCode: status, message });
      return;
    }
    response.redirect('/error');
  }
}
