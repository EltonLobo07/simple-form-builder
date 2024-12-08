export type AtLeastOne<T> = [T, ...T[]];
export type ReadonlyAtLeastOne<T> = Readonly<AtLeastOne<T>>;

export type AtLeastTwo<T> = [T, T, ...T[]];
export type ReadonlyAtLeastTwo<T> = Readonly<AtLeastTwo<T>>;
