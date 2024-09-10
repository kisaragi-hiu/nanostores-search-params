import UnpluginIsolatedDecl from "unplugin-isolated-decl/esbuild"

await Bun.build({
entrypoints: ['./index.ts'],
outdir: "./dist",
plugins: []
})
