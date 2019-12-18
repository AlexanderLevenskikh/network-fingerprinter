export function numberToWord(num: number): string {
    if (Number.isInteger(num)) {
        return (num >>> 0).toString(2).padStart(16, '0');
    }

    throw new TypeError(`${ num } is not an integer number`);
}
