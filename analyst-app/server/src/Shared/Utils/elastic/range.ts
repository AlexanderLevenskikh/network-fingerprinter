import { Nullable } from '../../Types/Nullable';
import { notEmpty } from '../notEmpty';

export const range = (
    key: string,
    gte: Nullable<number>,
    lte: Nullable<number>,
) => {
    return {
        range: {
            [ key ]: {
                ...(notEmpty(gte) ? { gte } : {}),
                ...(notEmpty(lte) ? { lte } : {}),
            },
        },
    }
};
