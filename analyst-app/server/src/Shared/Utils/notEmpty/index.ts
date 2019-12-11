export function notEmpty<TValue>(value: TValue | null | undefined | string): value is TValue {
    return value !== null && value !== undefined && !(typeof value === 'string' && value.match(/^\s*$/));
}
