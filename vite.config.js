import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  root: __dirname,
  base: '/ehmds-on-fkui-test/',
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: 'docs/architecture',
          dest: 'docs'
        }
      ]
    })
  ],
  server: {
    port: 3000,
    open: true,
    fs: {
      // Allow serving files from parent directories (docs folder)
      allow: ['..']
    },
    // Middleware to serve docs folder during development
    middlewareMode: false,
  },
  // Configure server to serve docs folder
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {
        // Check if request is for a docs markdown file (with or without base path)
        const urlPath = req.url || ''
        const docsPath = urlPath.replace('/ehmds-on-fkui-test/', '')
        if (docsPath.startsWith('docs/') && docsPath.endsWith('.md')) {
          const filePath = resolve(__dirname, docsPath)
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
            return res.end(fs.readFileSync(filePath, 'utf-8'))
          }
        }
        next()
      })
    }
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