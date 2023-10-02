import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import * as path from "path"
import typescript from "@rollup/plugin-typescript"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [typescript(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
