import {isNormalInteger} from "../isNormalInteger";

export function parseIntNullable(str: string, radix: number = 10) {
    return isNormalInteger(str)
        ? Number.parseInt(str, radix)
        : null
}
