import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Semua request /api diteruskan ke backend — tidak perlu hardcode URL di frontend
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
