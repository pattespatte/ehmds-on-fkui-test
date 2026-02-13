import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { staticDocsPlugin } from './plugins/static-docs.js'

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
    }),
    staticDocsPlugin({
      routes: [
        '/docs',
        '/docs/architecture/overview',
        '/docs/architecture/architecture-theory',
        '/docs/architecture/token-override',
        '/docs/architecture/wrapper',
        '/docs/architecture/extension',
        '/docs/architecture/composition',
        '/docs/architecture/comparison',
        '/docs/architecture/accessibility',
        '/docs/architecture/fkui-updates',
      ],
      base: '/ehmds-on-fkui-test/',
      outDir: 'dist',
    }),
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
