import fs from 'fs-extra';
import { defineBuildConfig } from 'unbuild';
import pkg from './package.json';

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default defineBuildConfig({
  entries: [
    './src/index',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
  externals: external,
  hooks: {
    'mkdist:done': () => {
      fs.copyFileSync('src/scss/index.scss', 'dist/styles.scss')
    },
  },
})
