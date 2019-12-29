export class SearchParamsModel {
    [ key: string ]: any;

    current: number = 1;
    take: number = 15;

    constructor(current: string | number = 1, take: string | number = 15) {
        let currentNumber = 1;
        let takeNumber = 15;

        if (typeof current === 'string') {
            currentNumber = Number.parseInt(current);
        } else {
            currentNumber = current;
        }
        if (typeof take === 'string') {
            takeNumber = Number.parseInt(take);
        } else {
            takeNumber = take;
        }

        this.current = currentNumber;
        this.take = takeNumber;
    }

}
