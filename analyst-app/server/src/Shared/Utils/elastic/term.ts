export const term = (key: string, value: any) => {
    return { term: { [key]: value } }
};
