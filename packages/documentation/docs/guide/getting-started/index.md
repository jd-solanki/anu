# Anu

> Anu means [Atom](https://en.wikipedia.org/wiki/Atom) in [Sanskrit](https://en.wikipedia.org/wiki/Sanskrit) ⚛️

## Motivation

I work at [ThemeSelection](https://themeselection.com) and for couple of times I had to build small Vue projects that required UI flexibility. I couldn't use Bootstrap because customization is not straight forward compared to frameworks like UnoCSS, WindiCSS & TailwindCSS.

Then there's a guy named [@antfu](https://github.com/antfu) who is great inspiration to me. He built great tools for vue ecosystem and I was using them in my every vue projects. Now the problem was repating the configuration & components in every project and there wasn't any component lib based on frameworks like UnoCSS to provide components for building UI quickly and provide enough flexibility.

Hence, I created this UI lib which provides ready to use beautiful components with utilities to build UI quickly.

### Why not TailwindCSS

You probably didn't read the UnoCSS [README](https://github.com/unocss/unocss#readme).

### Why dependencies

Anu is based on [UnoCSS](https://github.com/unocss/unocss), [VueUse](https://vueuse.org/) & [Floating UI](https://floating-ui.com/). Anu have this dependencies because there's a saying "_Don't reinvent the wheel_".

UnoCSS will provide CSS utilities and more. Moreover, compared to TailwindCSS creating custom utilities is much easier than TailwindCSS.

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
  include: [/.*\/anu-vue\.mjs(.*)?$/, './**/*.vue', './**/*.md'],
})
```

:::warning
Update highlighted line in above code snippet according line height in your app using `em` unit.

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
