<script lang="ts">
  import { queryParam } from "../../../../src/index";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { browser } from "$app/environment";
  const url = writable($page.url);
  if (browser) {
    setInterval(() => {
      url.set($page.url);
    }, 100);
  }
  const q = queryParam("q", {
    url: $page.url,
  });
  const foo = queryParam("foo", {
    url: $page.url,
    defaultValue: "abc",
    showDefaults: false,
  });
  const bar = queryParam("bar", {
    url: $page.url,
    defaultValue: "abc",
    showDefaults: true,
  });
</script>

<svelte:head>
  <title>SvelteKit playground | nanostores-search-params</title>
</svelte:head>

<div class="prose">
  <h1 class="text-2xl sm:text-3xl font-extrabold">SvelteKit playground</h1>
  <div class="mb-8">
    <h2 class="text-xl mt-6 mb-4 font-semibold">Navigating</h2>
    <p>
      These should update users of the store as well as the URL bar without
      doing a page reload.
    </p>
    <a href="." data-sveltekit-reload>Navigate to this page (reload)</a>
    <a href=".">Navigate to this page (no reload)</a>
    <div>
      <p>
        <b>BUG</b>: Without reload, the direct client side navigation does not
        notify the store, thus things get desynced as a result.
      </p>
    </div>
  </div>
  <div class="mb-8">
    <h2 class="text-xl mt-6 mb-4 font-semibold">Writing to the store</h2>
    <pre>Current `q`: {JSON.stringify($q)}</pre>
    <div>
      <p>
        These should update the `q` param in both the URL and the code block
        above.
      </p>
      <button
        on:click={() => {
          $q = "A";
        }}>Set `q` to "A"</button
      >
      <button
        on:click={() => {
          $q = "B";
        }}>Set `q` to "B"</button
      >
      <p>This should remove the `q` param from the URL.</p>
      <button
        on:click={() => {
          $q = undefined;
        }}>Set `q` to undefined</button
      >
    </div>
  </div>
  <div class="mb-8">
    <pre>Current `foo`: {JSON.stringify($foo)}</pre>
    <p>
      `foo` is configured as showDefaults: false; the default value is "abc".
    </p>
    <div>
      <p>These should update the `foo` param.</p>
      <button
        on:click={() => {
          $foo = "C";
        }}>Set `foo` to "C"</button
      >
      <button
        on:click={() => {
          $foo = "abc";
        }}>Set `foo` to "abc"</button
      >
      <p>
        Set `foo` to undefined. This should either actually set it to undefined
        or reset it to the default value; I haven't decided.
      </p>
      <button
        on:click={() => {
          $foo = undefined;
        }}>Set `foo` to undefined</button
      >
    </div>
  </div>
  <div class="mb-8">
    <pre>Current `bar`: {JSON.stringify($bar)}</pre>
    <p>
      `bar` is configured as showDefaults: true; the default value is "abc".
    </p>
    <div>
      <p>These should update the `bar` param.</p>
      <button
        on:click={() => {
          $bar = "D";
        }}>Set `bar` to "D"</button
      >
      <button
        on:click={() => {
          $bar = "abc";
        }}>Set `bar` to "abc"</button
      >
      <p>
        Set `bar` to undefined. This should either actually set it to undefined
        or reset it to the default value; I haven't decided.
      </p>
      <button
        on:click={() => {
          $bar = undefined;
        }}>Set `bar` to undefined</button
      >
    </div>
  </div>
</div>
