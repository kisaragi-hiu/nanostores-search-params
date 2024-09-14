// Vite seems to want ts-node to be able to load .ts configs.
// That's worse than just using .mjs.
export default {
  plugins: {
    tailwindcss: {},
  },
};
