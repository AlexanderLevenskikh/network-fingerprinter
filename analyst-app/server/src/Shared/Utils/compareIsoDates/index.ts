export function compareIsoDates(firstIsoDate: string, secondIsoDate: string) {
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
