import fs from 'fs-extra'
import scss from 'rollup-plugin-scss'
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    '@unocss/core',
    '@unocss/reset',
    'defu',
  ],
  hooks: {
    'mkdist:done': () => {
      fs.copyFileSync('src/scss/index.scss', 'dist/styles.scss')
    },
    'rollup:options': (ctx, rollupOptions) => {
      rollupOptions.plugins = rollupOptions.plugins || []
      if (Array.isArray(rollupOptions.plugins)) {
        rollupOptions.plugins.push(scss({
          output: 'dist/styles.css',
        }))
      }
    },
  },
})
