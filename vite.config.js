import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // Library build configuration
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'EHMDS',
      fileName: (format) => `ehmds.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      // Externalize deps that shouldn't be bundled into the library
      external: ['vue', '@fkui/vue'],
      output: {
        globals: {
          vue: 'Vue',
          '@fkui/vue': 'FKUI'
        }
      }
    },
    // Generate source maps for debugging
    sourcemap: true,
    // Clear output directory before build
    emptyOutDir: true
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true
  },

  // CSS processing configuration
  css: {
    preprocessorOptions: {
      scss: {
        // Additional SCSS options if needed
        additionalData: `@import "./src/assets/variables.scss";`
      }
    },
    // PostCSS plugins can be added here
    postcss: {
      plugins: []
    }
  },

  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      '@themes': resolve(__dirname, 'src/themes')
    }
  },

  // Define global constants
  define: {
    __EHMDS_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
})