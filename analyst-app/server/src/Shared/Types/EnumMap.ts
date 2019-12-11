export type EnumMap<Enum extends string | number, T> = {
    [ P in Enum ]: T;
};
