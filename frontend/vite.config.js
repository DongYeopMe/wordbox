import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true,
  },
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@page", replacement: "/src/page" },
      { find: "@image", replacement: "/src/image" },
      { find: "@components", replacement: "/src/components" },
    ],
  },
});
