import fs from 'fs-extra'
import { anuNuxtModuleFilePath, componentsNames, composablesNames, indent } from './utils'

const content = fs.readFileSync(anuNuxtModuleFilePath, { encoding: 'utf-8' })

const componentsRegex = /(?<=const anuComponentNames = \[\n)\s*.*?(?=\n])/gs
const composablesRegex = /(?<=const anuComposables = \[\n)\s*.*?(?=\n])/gs

const updatedContent = content
  .replace(componentsRegex, componentsNames.map(c => `${indent(2)}'${c}',`).join('\n'))
  .replace(composablesRegex, composablesNames.map(c => `${indent(2)}'${c}',`).join('\n'))

fs.writeFileSync(anuNuxtModuleFilePath, updatedContent, { encoding: 'utf-8' })
