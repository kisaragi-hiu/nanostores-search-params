<script>
  import { queryParam } from "../../../../src/index";
  import { page } from "$app/stores";
  const name = queryParam("name", { url: $page.url });
</script>

<h1>nanostores-search-params playground</h1>
<div>
  <p>This should remove all params while updating users of the store.</p>
  <button
    on:click={() => {
      $name = undefined;
    }}>Set to undefined</button
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
  <a href="/">Clear params (reload)</a>
  <p>
    These should update users of the store as well as the URL bar without doing
    a page reload.
  </p>
  <button
    on:click={() => {
      $name = "A";
    }}>Set to "A"</button
  >
  <button
    on:click={() => {
      $name = "B";
    }}>Set to "B"</button
  >
</div>
<p>Current name: {$name}</p>
