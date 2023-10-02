import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import * as path from "path"

const projectRootDir = path.resolve(__dirname)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(projectRootDir, "src"),
      },
    ],
  },
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
