export const or = (...args: object[]) => ({
    bool: {
        should: [
            ...args,
        ],
    },
});
