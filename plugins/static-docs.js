import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Vite plugin to generate static HTML files for documentation routes
 * This enables GitHub Pages to serve documentation pages with HTTP 200
 */
export function staticDocsPlugin(options = {}) {
  const {
    routes = [],
    outDir = 'dist',
    base = '/',
  } = options

  return {
    name: 'static-docs-generator',
    closeBundle: async () => {
      // Read the generated index.html
      const indexPath = path.resolve(__dirname, '..', outDir, 'index.html')
      // Always regenerate to include new routes
      // Note: index.html must exist for this to work
      const indexHtml = fs.readFileSync(indexPath, 'utf-8')
      // Generate HTML files for each route
      for (const route of routes) {

      const indexHtml = fs.readFileSync(indexPath, 'utf-8')

      // Generate HTML files for each route
      for (const route of routes) {
        // Remove base path from route and ensure leading slash
        let routePath = route.replace(new RegExp(`^${base.replace('/', '\\/')}`), '/')
        if (!routePath.startsWith('/')) {
          routePath = '/' + routePath
        }

        // Create directory structure
        const filePath = path.resolve(__dirname, '..', outDir, routePath.slice(1), 'index.html')

        // Create directory if it doesn't exist
        fs.mkdirSync(path.dirname(filePath), { recursive: true })

        // Copy index.html to the new location
        fs.writeFileSync(filePath, indexHtml)

        console.log(`[static-docs] Generated: ${routePath}`)
      }
    }
  }
}
