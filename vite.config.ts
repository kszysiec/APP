import { defineConfig } from 'vite'
import path from "path";

import vue from '@vitejs/plugin-vue'
import pages from 'vite-plugin-pages';
import layouts from 'vite-plugin-vue-layouts';
import components from 'unplugin-vue-components/vite'
import autoImport from 'unplugin-auto-import/vite'
import wasm from 'vite-plugin-wasm'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }, 
  plugins: [
    wasm(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tagName => {
            return tagName === 'vue-advanced-chat' || tagName === 'emoji-picker'
          }
        }
      }
    }),
    pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' }
      ],
      exclude: ['**/components/*.vue']
    }),
    layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default'
    }),
    components({
      dirs: ['src/components'],
      dts: true,
      extensions: ['vue'],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }),
    autoImport({
      imports: [
        // presets
        'vue',
        'vue-router'
      ],
      dirs: [
        './src/composables'
      ],
    
    })
  ],
  server: {
    proxy: {
  }
 }
})
