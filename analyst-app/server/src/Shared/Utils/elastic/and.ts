export const and = (...args: object[]): object => ({
    bool: {
        must: [
            ...args,
        ],
    },
});
