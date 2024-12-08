type BaseSerializable = string | number | boolean | null;

type Serializable =
  | BaseSerializable
  | Array<Serializable>
  | ReadonlyArray<Serializable>
  | { [K: string | number]: Serializable };

type SerializableInit<T extends Serializable> = T | (() => T);

type FromLocalStorageParam<T extends Serializable> = Readonly<{
  defaultValue: SerializableInit<T>;
  isValue: (possibleValue: unknown) => possibleValue is T;
  key: string;
}>;

function getSerializable<T extends Serializable>(init: SerializableInit<T>) {
  return typeof init === "function" ? init() : init;
}

export function fromLocalStorage<T extends Serializable>(
  params: FromLocalStorageParam<T>
) {
  const valueFromLS = window.localStorage.getItem(params.key);
  if (valueFromLS === null) {
    return getSerializable(params.defaultValue);
  }
  try {
    const value = JSON.parse(valueFromLS);
    if (params.isValue(value)) {
      return value;
    }
  } catch (error) {
    console.error(error);
  }
  return getSerializable(params.defaultValue);
}

export function updateLocalStorage<TValue extends Serializable>(
  value: TValue,
  key: string
) {
  window.localStorage.setItem(key, JSON.stringify(value));
}
