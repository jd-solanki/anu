import fs from 'fs-extra'
import sass from 'sass'
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
  ],
  hooks: {
    'mkdist:done': () => {
      // ℹ️ We no longer need to ship SCSS file
      // fs.copyFileSync('src/scss/index.scss', 'dist/style.scss')

      const compiledSass = sass.compile('./src/scss/index.scss', { style: 'compressed', loadPaths: ['./node_modules/'] })

      fs.writeFileSync(
        'dist/style.css',
        compiledSass.css,
        { encoding: 'utf-8' },
      )
    },
  },
})
