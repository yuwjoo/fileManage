import { fileURLToPath, URL } from 'node:url';
import { join } from 'node:path';
import { readdir, readFile, stat } from 'node:fs/promises';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    visualizer({
      emitFile: false,
      filename: 'analysis-chart.html', // 分析图生成的文件名
      open: false // 如果存在本地服务端口，将在打包后自动展示
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      dts: fileURLToPath(new URL('./src/types/root/autoImports.d.ts', import.meta.url))
    }),
    Components({
      allowOverrides: true,
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
      dts: fileURLToPath(new URL('./src/types/root/components.d.ts', import.meta.url))
    }),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        iconfont: async (iconName) => {
          const rootDir = fileURLToPath(new URL('./src/assets/icons', import.meta.url));
          const getEachList = async (dir: string) => {
            return (await readdir(dir)).map((name) => [join(dir, name), name]);
          };
          const eachList = await getEachList(rootDir);
          const iconFileName = `${iconName.replaceAll('-', '')}.svg`;
          let eachFile;
          while ((eachFile = eachList.shift())) {
            if (eachFile[1].toLocaleLowerCase() === iconFileName) {
              break;
            } else if ((await stat(eachFile[0])).isDirectory()) {
              eachList.push(...(await getEachList(eachFile[0])));
            }
          }
          if (eachFile) {
            const svg = await readFile(eachFile[0], 'utf-8');
            return svg.replace(
              /(?=^<\?xml.*)?<svg /,
              '<svg fill="currentColor" width="1.2em" height="1.2em" '
            );
          }
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
