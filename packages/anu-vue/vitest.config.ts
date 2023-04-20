import {
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig, mergeConfig } from 'vitest/config'
import vitestBaseConfig from '../../vitest.config'

import { presetThemeDefault } from '../preset-theme-default/src/index'

import { presetIconExtraProperties } from './src/preset/icons'

import { presetAnu } from './src/preset'
import viteConfig from './vite.config'

const vitestConfig = mergeConfig(vitestBaseConfig, defineConfig({
  plugins: [
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          scale: 1.2,
          unit: 'em',
          extraProperties: presetIconExtraProperties,
        }),
        presetWebFonts({
          fonts: {
            sans: 'Inter',
            mono: 'Jet Brains Mono',
          },
        }),

        // anu-vue presets
        presetAnu(),
        presetThemeDefault(),
      ],
      include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
    }),
  ],
  test: {
    browser: {
      enabled: true,

      // @ts-expect-error ignore, we don't have the type here
      enableUI: true,
      name: 'chrome',
      headless: !!process.env.HEADLESS,
      provider: 'webdriverio',
    },
  },
}))

export default mergeConfig(viteConfig, vitestConfig)
