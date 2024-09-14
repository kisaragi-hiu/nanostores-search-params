<script>
  import "../src.css";

  const inactive =
    "border-stone-400 hover:border-stone-400 dark:hover:border-white text-stone-700 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-300";
  const active = "text-teal-500 border-current font-semibold dark:text-white";
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
          <a class={inactive} href="/">Home</a>
        </li>
        <li>
          <a class={active} href="/">SvelteKit Demo</a>
        </li>
      </ul>
    </nav>
  </div>
  <div class="mt-12">
    <slot />
  </div>
</div>
