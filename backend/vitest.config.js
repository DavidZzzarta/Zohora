import { defineConfig } from 'vitest/config'
import { resolve } from 'node:path'

const root = resolve(process.cwd() + '/build/')
console.log(root)

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
