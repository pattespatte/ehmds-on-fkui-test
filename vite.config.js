import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'EhmdsOnFkuiTest',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs', 'umd']
    },
    rollupOptions: {
      external: ['vue', '@fkui/vue'],
      output: {
        globals: {
          vue: 'Vue',
          '@fkui/vue': 'FkuiVue'
        }
      }
    }
  }
});