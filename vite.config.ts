import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";
import postcssImport from "postcss-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
