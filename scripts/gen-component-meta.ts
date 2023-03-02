import fs, { existsSync, mkdirSync } from 'fs'
import { join, parse, resolve } from 'path'

import fg from 'fast-glob'
import MarkdownIt from 'markdown-it'
import type { ComponentMeta, MetaCheckerOptions } from 'vue-component-meta'
import { createComponentMetaChecker } from 'vue-component-meta'

const md = new MarkdownIt()

/*
  ℹ️ Useful links

  vue-component-meta tests: https://github.com/johnsoncodehk/volar/blob/master/vue-language-tools/vue-component-meta/tests/index.spec.ts
  discord thread about improving vue-component-meta: https://discord.com/channels/793943652350427136/1027819645677350912
  GH issue for improving vue-component-meta based on runtime/dynamic props: https://github.com/johnsoncodehk/volar/issues/1854
  Discord chat: https://discord.com/channels/793943652350427136/1027819645677350912
*/

/*
  TODO: Try to create fake file to generate accurate props for dynamic code
  TODO: Sort props, events & slots alphabetically
  TODO: Group props by component. E.g. in Drawer component there's is lots of props, separating them via component (these are card based props) will be more easy to read and adopt
*/

// SECTION Types
export interface ComponentApiProps {
  name: ComponentMeta['props'][number]['name']
  description: ComponentMeta['props'][number]['description']

  // required: ComponentMeta['props'][number]['required']
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

const filterMeta = (meta: ComponentMeta): ComponentApi => {
  // const clonedMeta: ComponentMeta = JSON.parse(JSON.stringify(meta))

  // Exclude global props
  const props: ComponentApiProps[] = []
  meta.props.forEach(prop => {
    if (prop.global)
      return

    const { name, description, required, type, default: defaultValue } = prop

    props.push({
      name: `${name}${required ? '' : '?'}`,
      description: md.render(description),

      // required,

      type,
      default: defaultValue || 'unknown',
    })
  })

  return {
    props,
    events: meta.events,
    slots: meta.slots.map(s => ({ ...s, description: md.render(s.description) })),
  }
}

// Collect components
const components = fg.sync(['src/components/**/*.vue'], {
  cwd: resolve(__dirname, '../packages/anu-vue'),
  absolute: true,
})

// Generate component meta
components.forEach(componentPath => {
  const componentName = parse(componentPath).name

  // Thanks: https://futurestud.io/tutorials/node-js-get-a-file-name-with-or-without-extension
  const meta = filterMeta(tsconfigChecker.getComponentMeta(componentPath))

  const metaDirPath = resolve(__dirname, '../packages/anu-vue/component-meta')

  // if meta dir doesn't exist create
  if (!existsSync(metaDirPath))
    mkdirSync(metaDirPath)

  const metaJsonFilePath = join(metaDirPath, `${componentName}.json`)
  fs.writeFileSync(metaJsonFilePath, JSON.stringify(meta, null, 4))
})
