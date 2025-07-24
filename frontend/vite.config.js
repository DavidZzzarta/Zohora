import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'build',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      format: {
        comments: false,
      }
    }
  },
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
