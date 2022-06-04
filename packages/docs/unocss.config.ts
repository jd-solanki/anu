import { presetCore, presetThemeDefault } from 'anu-vue';
import {
  defineConfig,
  presetIcons, presetTypography,
  presetUno, presetWind, transformerDirectives
} from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),

    // anu-vue presets
    presetCore(),
    presetThemeDefault()
  ],
  safelist: presetThemeDefault().safelist,
  transformers: [
    transformerDirectives(),
  ],
  include: [/.*\/anu-vue\.mjs(.*)?$/, "./**/*.vue", "./**/*.md"],
})