# Anu

> Anu means [Atom](https://en.wikipedia.org/wiki/Atom) in [Sanskrit](https://en.wikipedia.org/wiki/Sanskrit) ⚛️

## Installation

Add `anu-vue` and its supporting libraries

```bash
yarn add anu-vue && yarn add -D unocss @unocss/preset-uno @unocss/preset-icons @iconify-json/bx
```

## Usage

Create UnoCSS Config file `unocss.config.ts` in root of the project with below content:

```ts{14}
import { presetCore, presetThemeDefault } from 'anu-vue'
import {
  defineConfig,
  presetIcons,
  presetUno,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        height: '1.5em',
        'flex-shrink': '0',
      },
    }),

    // anu-vue presets
    presetCore(),
    presetThemeDefault(),
  ],
  configDeps: ['../anu-vue/src/presets/theme-default/index.ts'],
  include: [/.*\/anu-vue\.mjs(.*)?$/, './**/*.vue', './**/*.md'],
})
```

:::warning
Update highlighted line in above code snippet according line height if your app using `em` unit.

e.g. For VitePress line height of paragraph is `24px`. Hence, we have height of `1.5em` in docs.
:::

Update your `main.ts` file like below:

```js
import { anu } from 'anu-vue'
import { createApp } from 'vue'

// UnoCSS import
import 'uno.css'

// import styles
import 'anu-vue/dist/style.css'

const app = createApp({
  /* ... */
})

// It will register all the components globally
app.use(anu)
```

You also follow À la carte fashion if you don't want to register all the components globally

```vue
<script setup>
import { ABtn } from 'anu-vue'
</script>

<template>
  <ABtn>Primary</ABtn>
</template>
```
