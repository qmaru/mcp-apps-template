import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: false,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [react(), viteSingleFile()],
})
