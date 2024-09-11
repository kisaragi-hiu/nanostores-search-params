<script lang="ts">
  import { queryParam } from "../../../../src/index";
  import { page } from "$app/stores";
  const q = queryParam("q", {
    url: $page.url,
  });
  const p = queryParam("p", {
    url: $page.url,
    defaultValue: 1,
  });
  const num = queryParam("p", {
    url: $page.url,
    type: "number",
    defaultValue: 1.5,
  });
  const num = queryParam("p", {
    url: $page.url,
    type: "integer",
    defaultValue: 1,
  });
  const num = queryParam("p", {
    url: $page.url,
    type: "json",
    defaultValue: { abc: "def" },
  });
</script>

<h1>nanostores-search-params playground</h1>
<p>Current q: {$q}</p>
<p>Current p: {$p}</p>
<div>
  <p>This should remove the `q` param while updating users of the store.</p>
  <button
    on:click={() => {
      $q = undefined;
    }}>Set `q` to undefined</button
  >
  <p>
    This should remove all params and reload the page. Things depending on the
    store update properly as a result.
  </p>
  <a href="/" data-sveltekit-reload>Clear params (reload)</a>
  <p>
    This does a direct client side navigation without notifying the store. The
    store and the URL param get desynced as a result.
  </p>
  <a href="/">Clear params without reload</a>
  <p>
    These should update users of the store as well as the URL bar without doing
    a page reload.
  </p>
  <button
    on:click={() => {
      $q = "A";
    }}>Set to "A"</button
  >
  <button
    on:click={() => {
      $q = "B";
    }}>Set to "B"</button
  >
</div>
