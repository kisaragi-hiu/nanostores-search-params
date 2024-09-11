<script lang="ts">
  import { queryParam } from "../../../../src/index";
  // import { q } from "../store";
  const q = queryParam("q");
</script>

<div>
  <div class="inputHeader">This value should be synced up with the q param</div>
  <input type="search" bind:value={$q} placeholder="Text..." />
  <div>
    <button
      on:click={() => {
        $q = "hello";
      }}>Set `q` to "hello"</button
    >
    <button
      on:click={() => {
        $q = undefined;
      }}>Reset `q`</button
    >
  </div>
</div>
