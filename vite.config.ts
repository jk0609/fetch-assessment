import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@StateManagement": "/src/StateManagement/",
      "@Components": "/src/Components/",
      "@Utils": "/src/Utils/",
    },
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
    }),
  ],
});
