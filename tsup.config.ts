import { defineConfig } from 'tsup';

export default defineConfig((options) => {
  return {
    entry: ['src/**/*.ts'],
    format: ['cjs'],
    outDir: 'dist',
    splitting: false, // Disable code splitting
    clean: true,
    sourcemap: true,
    bundle: true,
    dts: false,
    shims: false,
    minify: true,
    keepNames: true,
    esbuildOptions(options) {
      options.alias = {
        '@constants': './src/constants',
        '@domain': './src/domain',
        '@hooks': './src/hooks',
        '@middlewares': './src/middlewares',
        '@plugins': './src/plugins',
        '@routes': './src/routes',
        '@types': './src/types',
        '@schemas': './src/schemas',
        '@infrastructure': './src/infrastructure',
        '@utils': './src/utils',
        '@root': './src',
      };
    },
    tsconfig: './tsconfig.build.json',
    silent: !options.watch,
  };
});
