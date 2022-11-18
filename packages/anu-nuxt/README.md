
## Install

### pnpm
```
pnpm add @anu-vue/nuxt && pnpm add -D @unocss/nuxt @iconify-json/bx
```

### Add to nuxt.config.ts
```ts
export default {
  modules: [
    '@anu-vue/nuxt',
    '@unocss/nuxt',
  ],
}
```

## Create Config File
unocss.config.ts

```ts
import type { UnocssNuxtOptions } from '@unocss/nuxt'
import presetIcons from '@unocss/preset-icons'
import presetUno from '@unocss/preset-uno'
import { presetCore, presetThemeDefault } from 'anu-vue'

export default <UnocssNuxtOptions>{
  preflight: false,
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'height': '1.5em',
        'flex-shrink': '0',
        'display': 'inline-block',
      },
    }),

    // anu-vue presets
    presetCore(),
    presetThemeDefault(),
  ],
  include: [/.*\/anu-nuxt\.js(.*)?$/, './**/*.vue', './**/*.md'],
}
```



## 💚 Credits

Library Write [productdevbook](https://github.com/productdevbook)
