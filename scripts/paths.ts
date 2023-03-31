import path from 'path'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const repoRoot = path.join(__dirname, '..')
export const anuVuePkgRoot = path.join(__dirname, '..', 'packages', 'anu-vue')
export const anuVueComponentsDir = path.join(anuVuePkgRoot, 'src', 'components')
