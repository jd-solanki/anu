import path from 'node:path'
import * as url from 'node:url'
import fs from 'fs-extra'
import { globbySync } from 'globby'
import { anuVueCorePkgRoot } from './paths'
import { indent } from './utils'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const content = `declare module 'vue' {
  export interface GlobalComponents {
$components
  }
}

export  {}`

const genImportString = (componentName: string) => `${indent(4)}${componentName}: typeof import('@anu-vue/core')['${componentName}']`

const anuVueComponentsDir = path.join(anuVueCorePkgRoot, 'src', 'components')
const componentsPath = globbySync(['**/*.vue'], { cwd: anuVueComponentsDir, absolute: true })
const componentNames = componentsPath.map(c => path.parse(c).name)

const imports = componentNames.map(c => genImportString(c))
const volarDTSContent = content.replace('$components', imports.join('\n'))

// Write files
fs.writeFileSync(path.join(anuVueCorePkgRoot, 'volar.d.ts'), volarDTSContent, { encoding: 'utf-8' })
