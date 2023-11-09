import * as path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tsPaths from "vite-tsconfig-paths"
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tsPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "./runtimeConfig": "./runtimeConfig.browser",
    },
  },
  envPrefix: "REACT_",
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
