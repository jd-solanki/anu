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
  externals: ['tailwindcss/plugin'],
  hooks: {
    'mkdist:done': async () => {
      await fs.copy('./src/styles.css', './dist/styles.css')
    },
  },
})
