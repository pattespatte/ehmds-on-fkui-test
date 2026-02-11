import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'

export default defineConfig({
  root: __dirname,
  base: '/ehmds-on-fkui-test/',
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'docs/**/*',
          dest: '.'
        }
      ]
    })
  ],
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})