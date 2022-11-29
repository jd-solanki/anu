import fs from 'fs-extra'
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
    'defu',
  ],
  hooks: {
    'mkdist:done': () => {
      fs.copyFileSync('src/scss/index.scss', 'dist/styles.scss')
    },
  },
})
