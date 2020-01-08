export class InternalServerError extends Error {
    title: string;
    width: number;

    constructor() {
        super();
        Object.setPrototypeOf(this, InternalServerError.prototype);

        this.title = 'Сервис недоступен';
        this.width = 505;
    }
}
