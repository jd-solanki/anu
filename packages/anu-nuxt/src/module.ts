/* eslint-disable @typescript-eslint/no-use-before-define */
import { presetAnu, presetIconExtraProperties } from 'anu-vue'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'
import {
addComponent,
addImportsSources,
addPlugin,
createResolver,
defineNuxtModule
} from '@nuxt/kit'

import { name, version } from '../package.json'

export interface ModuleOptions {

  /**
   * Import Anu Preset Theme Default | Source npm pkg: `@anu-vue/preset-theme-default`
   * When enabled, it will automatically set up the default presets for Anu and Uno.
   * We recommend to enable this option to get the best experience.
   *
   * @default true
   */
  presetTheme?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  defaults: {
    presetTheme: true,
  },
  meta: {
    name,
    version,
    configKey: 'anu',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(opts, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.css.push('anu-vue/dist/style.css')

    if (opts.presetTheme) {
      // Import Anu Preset Theme Default CSS
      nuxt.options.css.push('@anu-vue/preset-theme-default/dist/style.css')

      const iconPreset = nuxt.options.unocss?.icons || true

      nuxt.options.unocss = nuxt.options.unocss || {}
      nuxt.options.unocss.preflight = false
      nuxt.options.unocss.presets = [
        // @ts-expect-error - We know that is a valid preset
        presetUno(),
        presetAnu(),

        // @ts-expect-error - We know that is a valid preset
        presetThemeDefault(),
        ...(nuxt.options.unocss.presets || []),
      ]

      // If icon preset is enabled, add it to the presets
      // Then if true we will add the default anu icon preset
      if (iconPreset) {
        nuxt.options.unocss.presets?.push(

          // @ts-expect-error - We know that is a valid preset
          presetIcons(typeof iconPreset === 'object'
            ? iconPreset
            : {
                scale: 1.2,
                extraProperties: presetIconExtraProperties,
              },
          ),
        )
      }
    }

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
        anu?: {}
      }
    }
  }
}
