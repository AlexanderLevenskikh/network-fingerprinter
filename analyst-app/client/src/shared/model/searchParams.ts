export class SearchParamsModel {
    [ key: string ]: any;

    skip: number = 0;
    take: number = 15;

    constructor(skip: string | number = 0, take: string | number = 15) {
        let skipNumber = 0;
        let takeNumber = 15;

        if (typeof skip === 'string') {
            skipNumber = Number.parseInt(skip);
        } else {
            skipNumber = skip;
        }
        if (typeof take === 'string') {
            takeNumber = Number.parseInt(take);
        } else {
            takeNumber = take;
        }

        this.skip = skipNumber;
        this.take = takeNumber;
    }

}
