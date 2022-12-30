/* eslint-disable @typescript-eslint/no-use-before-define */
import {
addComponent,
addImportsSources,
addPlugin,
createResolver,
defineNuxtModule
} from '@nuxt/kit'

import { name, version } from '../package.json'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'anuVue',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(moduleOptions, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.css.push('anu-vue/dist/style.css')

    nuxt.hook('prepare:types', ({ tsConfig, references }) => {
      tsConfig.compilerOptions!.types.push('anu-vue/volar')
      references.push({
        path: resolve(nuxt.options.buildDir, 'types/anu-vue.d.ts'),
      })
    })

    addPlugin({ src: resolve('./runtime/plugin') })

    // Add auto-imported components
    anuComponentNames.map(name =>
      addComponent({
        name,
        export: name,
        filePath: 'anu-vue',
      }),
    )

    addImportsSources([
      {
        from: 'anu-vue',
        imports: anuComposables,
      },
    ])
  },
})

const anuComponentNames = [
  'AAlert',
  'AAvatar',
  'ABadge',
  'ABaseInput',
  'ABtn',
  'ACard',
  'ACheckbox',
  'AChip',
  'ADataTable',
  'ADialog',
  'ADrawer',
  'AInput',
  'AList',
  'AListItem',
  'AMenu',
  'ARadio',
  'ARating',
  'ASelect',
  'ASwitch',
  'ATable',
  'ATextarea',
  'ATypography',
]

const anuComposables = [
  'useConfigurable',
  'useDOMScrollLock',
  'useGroupModel',
  'useInternalBooleanState',
  'useLayer',
  'useSearch',
  'useSort',
  'useSpacing',
  'useTeleport',
  // 'useProps',
]

declare module '@nuxt/schema' {
  interface ConfigSchema {
    runtimeConfig: {
      public?: {
        anu?: ModuleOptions
      }
    }
  }
}
