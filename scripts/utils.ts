import path from 'path'
import * as url from 'url'
import { globbySync } from 'globby'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
export const indent = (spaces: number) => ' '.repeat(spaces)

// paths
export const rootPath = path.join(__dirname, '..')
export const anuVuePkgPath = path.join(rootPath, 'packages', 'anu-vue')
export const anuNuxtPkgPath = path.join(rootPath, 'packages', 'anu-nuxt')

export const anuVueComponentsDir = path.join(anuVuePkgPath, 'src', 'components')
export const anuVueComposablesDir = path.join(anuVuePkgPath, 'src', 'composables')
export const componentsPath = globbySync(['**/*.vue'], { cwd: anuVueComponentsDir, absolute: true, objectMode: true })
export const composablesPath = globbySync(['use*.ts'], { cwd: anuVueComposablesDir, absolute: true, objectMode: true })

// components
export const componentsNames = componentsPath.map(c => path.parse(c.name).name)

// composables
export const composablesNames = composablesPath.map(c => path.parse(c.name).name)

// nuxt module
export const anuNuxtModuleFilePath = path.join(anuNuxtPkgPath, 'src', 'module.ts')
