import { build } from "esbuild";
import UnpluginIsolatedDecl from "unplugin-isolated-decl/esbuild";

await build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  outdir: "./dist",
  plugins: [UnpluginIsolatedDecl()],
});
