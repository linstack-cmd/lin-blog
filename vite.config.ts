import { defineConfig } from "vite";
import vike from "vike/plugin";
import mdx from "@mdx-js/rollup";
import flowCSS from "@flow-css/vite";

export default defineConfig({
  plugins: [
    mdx({ providerImportSource: undefined }),
    vike({}),
    flowCSS(),
  ],
});
