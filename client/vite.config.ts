import * as path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsPaths from "vite-tsconfig-paths"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  build: {
    outDir: "build",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ant-vendor": ["antd"],
        },
      },
    },
  },
})
