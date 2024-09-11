import { atom, onMount } from "nanostores";
import type { WritableAtom } from "nanostores";

// const identity = <T>(x: T) => x;

type Decoder<T> = (rawValue: string) => T | undefined;
// type Encoder<T> = (value: T) => string | undefined;

/**
 * Get the `name` param from `params`, taking care of nulls.
 */
// Naming, like everything else, is inspired by paoloricciuti/sveltekit-search-params.
function getActualParam<T>(
  params: URLSearchParams,
  name: string,
): string | undefined;
function getActualParam<T>(
  params: URLSearchParams,
  name: string,
  decoder: Decoder<T>,
): T | undefined;
function getActualParam<T>(
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
    /**
     * A URL object to read the state from, if `location` isn't available when
     * getting the value.
     * The state is written to the DOM separately via `history`, not through
     * this object.
     */
    url?: URL;
    /**
     * Whether to push new history entries allowing for back/forward to navigate
     * through previous values. Defaults to true.
     */
    pushHistory?: boolean;
    showDefaults?: boolean;
  },
): WritableAtom<string | undefined> {
  const pushHistory = opts?.pushHistory ?? true;
  const url =
    opts?.url ?? typeof location !== "undefined"
      ? new URL(location?.href)
      : new URL("https://example.com");
  const params = url.searchParams;
  // The store should hold the decoded JS value
  const actualParam = getActualParam(params, name);
  const store = atom(actualParam ?? opts?.defaultValue);

  onMount(store, () => {
    // This only writes defaults to the URL once on the client, so things that
    // depend on correct values on client side would work, but not for
    // server side things
    if (actualParam === undefined && opts?.showDefaults) {
      // This is to fire off our before advice and also notify subscribers (if
      // any)
      store.set(opts?.defaultValue);
    }
    // return () => {
    //   //destroy
    // };
  });

  const origGet = store.get;
  store.get = () => {
    // this is mainly just to run the off() handler when appropriate
    origGet();
    return getActualParam(params, name) ?? opts?.defaultValue;
  };
  const origSet = store.set;
  store.set = (newValue) => {
    if (newValue === undefined) {
      params.delete(name);
    } else {
      params.set(name, newValue);
    }

    // Don't try to do this on a server
    if (typeof history !== "undefined") {
      if (pushHistory) {
        history.pushState({}, "", url);
      } else {
        history.replaceState({}, "", url);
      }
    }

    // Put the decoded JS value in the store
    return origSet(newValue);
  };
  return store;
}
