import { defineConfig } from 'vitest/config'

import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const root = join(__dirname, 'build')

export default defineConfig({
  test: {
    setupFiles: ['./test-setup.js'],
    testTimeout: 5000,
    /*environment: 'node'*/
  },
  resolve: {
    alias: {
      '@src': root
    }
  }
})
