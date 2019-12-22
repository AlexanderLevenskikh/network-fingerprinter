import { notEmpty } from '../notEmpty';

export function isEmpty<TValue>(value: TValue | null | undefined | string): value is TValue {
    return !notEmpty(value);
}
