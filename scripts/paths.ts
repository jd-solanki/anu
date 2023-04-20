import path from 'node:path'
import * as url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const repoRoot = path.join(__dirname, '..')
export const packagesDir = path.join(repoRoot, 'packages')

export const anuVuePkgRoot = path.join(packagesDir, 'anu-vue')
export const anuVueSrc = path.join(anuVuePkgRoot, 'src')
export const anuVueComponentsDir = path.join(anuVuePkgRoot, 'src', 'components')
