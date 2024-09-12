# nanostores-search-params

https://npmjs.com/package/nanostores-search-params

Read and write search params via a nanostore.

A port of [sveltekit-search-params](https://github.com/paoloricciuti/sveltekit-search-params). This uses browser APIs directly so that it will be usable in, say, an Astro project.

## Why

- **Why not use location.url.searchParams.{get,set}**

  a nanostore allows for other stuff that depend on the value of the store to automatically update when a `set` happens.

- **Why not write / use a Svelte store for this**

  Making it a nanostore allows for use in other frameworks as well.

## Status

- String in/out kind of works
- Not really usable yet
- No docs
- Publishing todos: publish playground pages as demos, tests not yet automated, no Changelog, build process not done yet

## TODOs

- actually set up tests
- set up demo site(s)
  - design
  - docs / link to docs
  - maybe use as automatic tests as well
- docs
- same URL and key should get same store
- encode decode edge cases
  - should encode return null? undefined? should it receive them?
  - should decode return null? undefined? should it receive them?
- features
  - [ ] debounceHistory
  - [X] pushHistory
  - [ ] sort
  - [X] showDefaults
  - [ ] equalityFn (is this applicable?)
  - [ ] encoder / decoder (do this first)
  - [ ] convenience types (string, number, integer, json)
