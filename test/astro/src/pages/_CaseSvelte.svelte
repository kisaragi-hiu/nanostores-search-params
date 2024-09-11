<script lang="ts">
  import { q } from "../store";
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
