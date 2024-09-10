import UnpluginIsolatedDecl from "unplugin-isolated-decl/esbuild"

await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "./dist",
  plugins: [],
})
