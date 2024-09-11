import { atom } from "nanostores";
import type { WritableAtom } from "nanostores";

const identity = <T>(x: T) => x;

type Decoder<T> = (rawValue: string | null) => T | undefined;
type Encoder<T> = (value: T) => string | undefined;

function getParam<T>(
  params: URLSearchParams,
  name: string,
  decoder?: Decoder<T> | undefined,
) {
  if (typeof decoder === "undefined") {
    return params.get(name);
  }
  return decoder(params.get(name));
}

export function queryParam<T extends number>(
  name: string,
  opts?: {
    type?: "number" | "integer";
    defaultValue?: number;
    url?: URL;
    pushHistory?: boolean;
  },
): WritableAtom<number>;
export function queryParam<T>(
  name: string,
  opts?: {
    /**
     * Specify the JS type of the value.
     * If unspecified or "string", use the raw string as from the URL (except if a
     * param doesn't exist, that is treated as `undefined` instead of `null`).
     * If "number", convert to/from a number.
     */
    // This has to be runtime because I want to use this to specify different
    // kinds of builtin encoder/decoders.
    type?:
      | "string"
      | "number"
      | "integer"
      | undefined
      | {
          /**
           * Function to encode a JS value into string in the param.
           * If this returns `undefined`, the param is removed.
           */
          encode: Encoder<T>;
          /**
           * Function to decode a param value into a JS value.
           */
          decode: Decoder<T>;
        };
    defaultValue?: T;
    url?: URL;
    pushHistory?: boolean;
  },
): WritableAtom<T> {
  const pushHistory = opts?.pushHistory ?? true;
  const type = opts?.type;
  let encode: Encoder<T> | undefined = undefined;
  let decode: Decoder<T> | undefined = undefined;
  if (typeof type === "object") {
    encode = type.encode;
    decode = type.decode;
  } else if (type === "number") {
    encode = (value: T) => value.toString();
    decode = (rawValue: string | null) => {
      if (rawValue) {
        return Number.parseFloat(rawValue);
      }
      return undefined;
    };
  }
  const url = opts?.url ?? new URL(location.href);
  const params = url.searchParams;
  // The store should hold the decoded JS value
  const store = atom(getParam(params, name, decode) ?? opts?.defaultValue);
  console.log(store);
  const origGet = store.get;
  store.get = () => {
    // this is mainly just to run the off() handler when appropriate
    origGet();
    return getParam(params, name, decode);
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

    if (pushHistory) {
      history.pushState({}, "", url);
    } else {
      history.replaceState({}, "", url);
    }

    // Put the decoded JS value in the store
    return origSet(newValue);
  };
  return store;
}
