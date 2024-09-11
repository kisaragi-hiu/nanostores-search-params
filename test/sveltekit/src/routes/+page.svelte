<script>
  import { queryParam } from "../../../src/index";
  import { page } from "$app/stores";
  const name = queryParam("name", { url: $page.url });
</script>

<h1>nanostores-search-params playground</h1>
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
<p>Current name: {$name}</p>
