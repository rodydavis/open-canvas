import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/open-canvas/",
  build: {
    lib: {
      entry: "src/open-canvas.ts",
      formats: ["es"],
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
});
