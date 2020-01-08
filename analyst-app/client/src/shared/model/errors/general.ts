import { ComponentType } from 'react';

export class GeneralResponseError extends Error {
    title: string;
    width: number;

    constructor() {
        super();
        Object.setPrototypeOf(this, GeneralResponseError.prototype);

        this.title = 'Произошла ошибка';
        this.width = 505;
    }
}
