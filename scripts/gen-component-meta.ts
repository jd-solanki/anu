import fs, { existsSync, mkdirSync } from 'fs'
import { join, parse, resolve } from 'path'

import fg from 'fast-glob'
import type { ComponentMeta, MetaCheckerOptions } from 'vue-component-meta'
import { createComponentMetaChecker } from 'vue-component-meta'

// SECTION Types
export interface ComponentApiProps {
  name: ComponentMeta['props'][number]['name']
  description: ComponentMeta['props'][number]['description']
  required: ComponentMeta['props'][number]['required']
  type: ComponentMeta['props'][number]['type']
  default: ComponentMeta['props'][number]['default']
}

export interface ComponentApi {
  props: ComponentApiProps[]
  events: ComponentMeta['events']
  slots: ComponentMeta['slots']
}

// !SECTION

const checkerOptions: MetaCheckerOptions = {
  forceUseTs: true,
  schema: { ignore: ['MyIgnoredNestedProps'] },
  printer: { newLine: 1 },
}

const tsconfigChecker = createComponentMetaChecker(
  resolve(__dirname, '../packages/anu-vue/tsconfig.json'),
  checkerOptions,
)

// TODO: Define return type
const filterMeta = (meta: ComponentMeta): ComponentApi => {
  // const clonedMeta: ComponentMeta = JSON.parse(JSON.stringify(meta))

  // Exclude global props
  const props: ComponentApiProps[] = []
  meta.props.forEach(prop => {
    if (prop.global)
      return

    const { name, description, required, type, default: defaultValue } = prop

    let propType = type.replace('"primary" | "success" | "info" | "warning" | "danger"', 'Color')
    propType = !required ? propType.replace('| undefined', '') : propType

    const propTypeAttrs = propType.includes('Color') ? ` title='${type}'` : ''

    props.push({
      name,
      description,
      required,

      /*
        ℹ️ We need to replace `|` character with `\\|` from type to correctly render type in single column
        otherwise text after `|` will considered as next column
      */
      type: `<code${propTypeAttrs}>${propType}</code>`,
      default: defaultValue ? `<code>${defaultValue}</code>` : 'unknown',
    })
  })

  return {
    props,
    events: meta.events,
    slots: meta.slots,
  }
}

const components = fg.sync(['src/components/**/*.tsx'], {
  cwd: resolve(__dirname, '../packages/anu-vue'),
  absolute: true,
})

components.forEach(componentPath => {
  // Thanks: https://futurestud.io/tutorials/node-js-get-a-file-name-with-or-without-extension
  const componentExportName = parse(componentPath).name
  const meta = filterMeta(tsconfigChecker.getComponentMeta(componentPath, componentExportName))

  const metaDirPath = resolve(__dirname, '../packages/anu-vue/component-meta')

  // if meta dir doesn't exist create
  if (!existsSync(metaDirPath))
    mkdirSync(metaDirPath)

  const metaJsonFilePath = join(metaDirPath, `${componentExportName}.json`)
  fs.writeFileSync(metaJsonFilePath, JSON.stringify(meta, null, 4))
})
