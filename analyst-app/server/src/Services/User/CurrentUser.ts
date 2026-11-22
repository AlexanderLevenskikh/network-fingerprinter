import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export interface CurrentUserOptions {
    required?: boolean;
}

// Nest 10 passes ExecutionContext, not the raw Express Request, as the second
// argument to a custom parameter decorator. Always retrieve the live Passport
// session user from that request, not from stale session data.
export const CurrentUser: (options?: CurrentUserOptions) => ParameterDecorator = createParamDecorator(
    (options: CurrentUserOptions = {}, context: ExecutionContext) => {
        const user = context.switchToHttp().getRequest().user;
        if (options && options.required && !user) {
            throw new UnauthorizedException();
        }
        return user;
    },
);
