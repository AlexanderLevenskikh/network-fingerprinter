export interface IForbiddenErrorArgs {
    title?: string;
    message?: string;
}

export class ForbiddenError extends Error {
    title: string;

    constructor(
        {
            title = 'Доступ запрещен 403',
            message = 'У вас нет прав для совершения действия',
        }: IForbiddenErrorArgs,
    ) {
        super();
        this.constructor = ForbiddenError;
        Object.setPrototypeOf(this, ForbiddenError.prototype);
        this.name = ForbiddenError.name;

        this.title = title;
        this.message = message;
    }
}
