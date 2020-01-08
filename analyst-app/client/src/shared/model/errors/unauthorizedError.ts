export class UnauthorizedError extends Error {
    constructor() {
        super('Пользователь не авторизован в сервисе');

        this.constructor = UnauthorizedError;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
        this.name = UnauthorizedError.name;
    }
}
