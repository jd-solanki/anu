
  
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      formats: ["cjs", "es"],
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "anu-vue",
      fileName: (format) => `anu-vue.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        "vue",
        "@unocss/preset-icons",
        "@unocss/preset-uno",
        "@unocss/transformer-variant-group",
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});