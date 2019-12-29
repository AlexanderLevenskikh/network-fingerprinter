interface IDateParts {
    day: string;
    month: string;
    monthNumber: number;
    year: string;
    hours: string;
    minutes: string;
}

export class DateTimeService {
    /**
     * Преобразует ISO-дату в формат 'dd.MM.yyyy в hh:mm'
     */
    public static isoDateToDateTimeString(dateStr: string) {
        try {
            const {
                day, month, year, hours, minutes,
            } = DateTimeService.getDateParts(dateStr);

            return `${ day }.${ month }.${ year } в ${ hours }:${ minutes }`;
        } catch (error) {

            return '';
        }
    }

    public static isoDatesComparator(firstIsoDate: string, secondIsoDate: string): -1 | 0 | 1 {
        try {
            const firstDate = new Date(firstIsoDate);
            const secondDate = new Date(secondIsoDate);

            if (firstDate < secondDate) {
                return -1;
            } else if (firstDate > secondDate) {
                return 1;
            }
        } catch (error) {
            console.error(error);
        }

        return 0;
    }

    private static getDateParts(dateStr: string): IDateParts {
        const isValid = DateTimeService.validateIsoDateString(dateStr);
        if (!isValid) {
            throw new Error(`formatDateTime argument ${ dateStr } parsing error: invalid date`);
        }

        const date = new Date(dateStr);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const monthNumber = date.getMonth();
        const year = date.getFullYear()
            .toString();
        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        return {
            day, month, monthNumber, year, hours, minutes,
        };
    }

    private static validateIsoDateString(dateStr: string): boolean {
        return !isNaN(Date.parse(dateStr));
    }
}
