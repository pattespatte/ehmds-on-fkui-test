import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'EHMDS',
      fileName: (format) => `ehmds.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', '@fkui/vue'],
      output: {
        globals: {
          vue: 'Vue',
          '@fkui/vue': 'FKUI'
        }
      }
    },
    sourcemap: true,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})