<script lang="ts">
  import { queryParam } from "../../../../src/index";
  const q = queryParam("q");
</script>

<div>
  <div class="inputHeader">This value should be synced up with the q param</div>
  <input type="search" bind:value={$q} placeholder="Type some text here..." />
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
