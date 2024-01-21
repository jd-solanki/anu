import path from 'node:path'
import * as url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

export const repoRoot = path.join(__dirname, '..')
export const packagesDir = path.join(repoRoot, 'packages')

export const anuVueCorePkgRoot = path.join(packagesDir, 'core')
export const anuVueSrc = path.join(anuVueCorePkgRoot, 'src')
export const anuVueComponentsDir = path.join(anuVueCorePkgRoot, 'src', 'components')
export const anuVueDistDir = path.join(anuVueCorePkgRoot, 'dist')
