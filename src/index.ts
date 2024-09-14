import { atom, onMount } from "nanostores";
import type { WritableAtom } from "nanostores";

// const identity = <T>(x: T) => x;

/**
 * Make sure `maybeUrl` is a URL.
 */
function processUrl(maybeUrl: URL | string | undefined): URL {
  if (typeof maybeUrl === "undefined") {
    return typeof location !== "undefined"
      ? new URL(location?.href)
      : new URL("https://example.com");
  } else if (typeof maybeUrl === "string") {
    return new URL(maybeUrl);
  } else {
    return maybeUrl;
  }
}

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

/**
 * Used to make sure multiple calls to `queryParam` would receive the same
 * store and can thus share the state.
 */
const storesCache: Map<string, WritableAtom<string | undefined>> = new Map();

export function queryParam(
  /**
   * Return a store that reads and writes this URL parameter.
   */
  name: string,
  opts?: {
    defaultValue?: string;
    /**
     * A URL object or string to read the state from instead of `location.href`.
     * This is useful for server side rendering.
     * The state is written to the DOM separately via `history`, not through
     * this object.
     */
    url?: URL | string;
    /**
     * Whether to push new history entries allowing for back/forward to navigate
     * through previous values. Defaults to true.
     */
    pushHistory?: boolean;
    showDefaults?: boolean;
  },
): WritableAtom<string | undefined> {
  const pushHistory = opts?.pushHistory ?? true;
  const url = processUrl(opts?.url);
  const urlString = url.toString();
  const params = url.searchParams;
  // The store should hold the decoded JS value
  const actualParam = getActualParam(params, name);

  const cachedStore = storesCache.get(urlString);
  if (typeof cachedStore !== "undefined") {
    return cachedStore;
  }

  const store = atom<string | undefined>();

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
  // Try to only use the cache in contexts where we can set stuff
  if (typeof history !== "undefined") {
    storesCache.set(urlString, store);
  }
  return store;
}
