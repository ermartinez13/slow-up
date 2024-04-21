import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
    https: {
      key: fs.readFileSync('/localhost-key.pem'),
      cert: fs.readFileSync('/localhost.pem')
    }
  },
});
