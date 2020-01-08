export interface INotFoundErrorArgs {
    title?: string;
    message?: string;
}

export class NotFoundError extends Error {
    title: string;

    constructor(
        {
            title = 'Ошибка 404',
            message = 'Скорее всего вы ошиблись, набирая адрес',
        }: INotFoundErrorArgs,
    ) {
        super();
        this.constructor = NotFoundError;
        Object.setPrototypeOf(this, NotFoundError.prototype);
        this.name = NotFoundError.name;

        this.title = title;
        this.message = message;
    }
}
