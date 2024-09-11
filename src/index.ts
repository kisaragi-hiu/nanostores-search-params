import { atom } from "nanostores";

const identity = <T>(x: T) => x;

function encodePassthru(value: unknown): string | undefined {
  if (typeof value === "undefined") return undefined;
  if (typeof value === "string") return value;
  throw new Error("Please specify how to convert the value to a string");
}
function decodePassthru(rawValue: string | null): string | undefined {
  if (typeof rawValue === "string") return rawValue;
  return undefined;
}

export function queryParam<T>(
  name: string,
  opts?: {
    /**
     * Function to encode a JS value into string.
     * If this returns `undefined`, the param is removed.
     */
    encode?: (value: unknown) => string | undefined;
    decode?: (rawValue: string | null) => T | undefined;
    defaultValue?: T;
    url?: URL;
    pushHistory?: boolean;
  },
) {
  const encode = opts?.encode ?? encodePassthru;
  const decode = opts?.decode ?? decodePassthru;
  const url = opts?.url ?? new URL(location.href);
  const params = url.searchParams;
  const store = atom(params.get(name) ?? opts?.defaultValue);
  console.log(store);
  const origGet = store.get;
  store.get = () => {
    // this is mainly just to run the off() handler when appropriate
    origGet();
    return decode(params.get(name));
  };
  const origSet = store.set;
  store.set = (newValue) => {
    if (newValue === undefined) {
      params.delete(name);
    } else {
      const encoded = encode(newValue);
      if (encoded === undefined) {
        params.delete(name);
      } else {
        params.set(name, encoded);
      }
    }

    if (opts?.pushHistory) {
      history.pushState({}, "", url);
    } else {
      history.replaceState({}, "", url);
    }

    // Put the decoded JS value in the store
    return origSet(newValue);
  };
  return store;
}
