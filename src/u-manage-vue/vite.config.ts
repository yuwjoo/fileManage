import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: './src/types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'i',
          enabledCollections: ['ep'],
          alias: {
            el: 'ep'
          },
          customCollections: ['iconfont']
        })
      ],
      dts: './src/types/components.d.ts'
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        iconfont: FileSystemIconLoader('./src/assets/icons', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      },
      iconCustomizer(collection, _icon, props) {
        if (collection === 'iconfont') {
          props.width = '1.2em';
          props.height = '1.2em';
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
