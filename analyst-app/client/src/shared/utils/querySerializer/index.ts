import queryString, { IParseOptions, IStringifyOptions } from 'qs';

export class QuerySerializer {
    public stringify(obj: any): string {
        return queryString.stringify(obj, this.stringifyOptions);
    }

    public parse(str: string): any {
        return queryString.parse(str, this.parseOptions);
    }

    private stringifyOptions: IStringifyOptions = {
        allowDots: true,
    };

    private parseOptions: IParseOptions = {
        allowDots: true,
    };
}

export const querySerializer = new QuerySerializer();
