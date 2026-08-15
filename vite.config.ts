import { defineConfig } from "vite";
import vike from "vike/plugin";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import flowCSS from "@flow-css/vite";

export default defineConfig({
  plugins: [
    mdx({ providerImportSource: undefined, remarkPlugins: [remarkGfm] }),
    vike(),
    flowCSS(),
  ],
});
