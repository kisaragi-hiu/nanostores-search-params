import { atom } from "nanostores";
import type { WritableAtom } from "nanostores";

const identity = <T>(x: T) => x;

type Decoder<T> = (rawValue: string) => T | undefined;
type Encoder<T> = (value: T) => string | undefined;

/**
 * Get the `name` param from `params`, taking care of nulls.
 */
function getParam<T>(params: URLSearchParams, name: string): string;
function getParam<T>(
  params: URLSearchParams,
  name: string,
  decoder: Decoder<T>,
): T | undefined;
function getParam<T>(
  params: URLSearchParams,
  name: string,
  decoder?: Decoder<T> | undefined,
): T | string | undefined {
  const value = params.get(name);
  // nanostores wants undefined, not nulls
  if (value === null) return undefined;
  if (typeof decoder === "undefined") {
    return value;
  }
  return decoder(value);
}

export function queryParam(
  name: string,
  opts?: {
    defaultValue?: string;
    url?: URL;
    pushHistory?: boolean;
  },
): WritableAtom<string> {
  const pushHistory = opts?.pushHistory ?? true;
  const url = opts?.url ?? new URL(location.href);
  const params = url.searchParams;
  // The store should hold the decoded JS value
  const store = atom(getParam(params, name) ?? opts?.defaultValue);
  console.log(store);
  const origGet = store.get;
  store.get = () => {
    // this is mainly just to run the off() handler when appropriate
    origGet();
    return getParam(params, name);
  };
  const origSet = store.set;
  store.set = (newValue) => {
    if (typeof newValue !== "string") {
      throw new Error("This store only supports strings for now");
    }
    if (newValue === undefined) {
      params.delete(name);
    } else {
      params.set(name, newValue);
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
