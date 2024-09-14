<script lang="ts">
  type Pages = "home" | "astro" | "sveltekit";
  export let page: Pages = "home";
  const inactiveCls =
    "border-stone-400 hover:border-stone-400 dark:hover:border-white text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300";
  const activeCls =
    "text-teal-500 border-current font-semibold dark:text-white";
</script>

<div class="flex">
  <div class="w-[20rem] relative">
    <nav class="sticky top-[2rem] nav">
      <ul>
        <li>
          <p>
            This is not yet working. The plan is to make this "sidebar" link to
            multiple demo sites.
          </p>
        </li>
        <li>
          <a class={page === "home" ? activeCls : inactiveCls} href="/">Home</a>
        </li>
        <li>
          <a
            class={page === "sveltekit" ? activeCls : inactiveCls}
            href="http://localhost:5173">SvelteKit Demo</a
          >
        </li>
        <li>
          <a
            class={page === "astro" ? activeCls : inactiveCls}
            href="http://localhost:4321/">Astro Demo</a
          >
        </li>
      </ul>
    </nav>
  </div>
  <div class="mt-12 flex-grow">
    <slot />
  </div>
</div>
