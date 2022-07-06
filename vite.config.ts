import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { ConfigEnv, UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import Components from 'unplugin-vue-components/vite';
import { viteVConsole } from 'vite-plugin-vconsole';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import createMockServer from './build/mockServer';
import glob from 'glob';
import mpaPlugin from 'vite-plugin-multiple-page';

export default defineConfig(({ command, mode }) => {
  const pagesData: any = {};
  glob.sync('./src/pages/**/index.vue').forEach(function (pageUrl) {
    const entry = pageUrl.replace('vue', 'ts');
    // const template = 'public/index.html'
    const template = pageUrl.replace('vue', 'html');
    const distFilename = pageUrl.split('./src/pages/')[1].replace('vue', 'html');
    console.log(distFilename);
    const filenameArr = distFilename.split('/');
    const key = filenameArr[filenameArr.length - 2];
    const filename = distFilename.replace('/index.html', '.html');
    pagesData[key] = {
      entry,
      filename,
      template
    };
  });

  console.log(pagesData);

  const root = process.cwd();
  const env = loadEnv(mode, root);

  return {
    base: env.VITE_APP_PUBLIC_PATH,
    define: {
      'process.env.VUE_APP_API_BASE_URL': JSON.stringify(env.VITE_APP_API_BASE_URL),
      'process.env.VUE_APP_PUBLIC_PATH': JSON.stringify(env.VITE_APP_PUBLIC_PATH)
    },
    plugins: [
      vue(),
      vueJsx(),
      visualizer(),

      legacy({
        targets: ['defaults', 'not IE 11']
      }),

      Components({
        dts: true,
        resolvers: [VantResolver()],
        types: []
      }),
      mpaPlugin({
        pages: pagesData
        //    {
        //     index: {
        //       entry: 'src/pages/index/index.ts',
        //       filename: 'index.html',
        //       template: 'index.html',

        //   },
        //   mock: {
        //     entry: 'src/pages/mock/index.ts',
        //     filename: 'mock.html',
        //     template: 'index.html',

        // },
        //   login: {
        //       entry: 'src/pages/login/index.ts',
        //       filename: 'login.html',
        //       template: 'index.html',

        //   }
        // index: {
        //   entry: 'src/pages/index/index.ts',
        //   filename: 'index.html',
        //   template: 'public/index.html'
        // },
        // mock: {
        //   entry: 'src/pages/mock/index.ts',
        //   filename: 'mock.html',
        //   template: 'public/index.html'
        // },
        // login: {
        //   entry: 'src/pages/login/index.ts',
        //   filename: 'login.html',
        //   template: 'public/index.html'
        // },

        // }
      })
    ],
    build: {
      assetsDir: 'assets', // 指定生成静态文件目录
      outDir: 'dist', // 指定输出路径
      cssCodeSplit: false, // 启用 CSS 代码拆分
      assetsInlineLimit: '4096', // 小于此阈值的导入或引用资源将内联为 base64 编码
      emptyOutDir: true, // 构建时清空该目录
      chunkSizeWarningLimit: 2048, // chunk 大小警告的限制
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/name-[hash].[ext]'
      }
    },

    resolve: {
      alias: {
        '~@': path.join(__dirname, './src'),
        '@': path.join(__dirname, './src'),
        '~': path.join(__dirname, './src/assets')
      }
    },

    server: {
      host: true,
      port: 3000,
      proxy: {
        '/api': {
          // backend url
          target: env.VITE_HTTP_MOCK && env.VITE_MOCK ? createMockServer() : '',
          ws: false,
          changeOrigin: true
        }
      }
    }
  };
});
