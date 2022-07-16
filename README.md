<h1 align="center">
   <a href="https://anu-vue.netlify.app/" target="_blank" align="center">
      Anu
   </a>
</h1>

<p align="center">DX focused utility based component library.</p>

<p align="center">
   <a href="https://github.com/jd-solanki/anu/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/jd-solanki/anu" alt="license">
   </a>
   <a href="https://github.com/jd-solanki/anu/releases">
    <img src="https://img.shields.io/github/release/jd-solanki/anu.svg" alt="GitHub release">
  </a>
   <a href="https://twitter.com/me_jd_solanki" target="_blank">
      <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/me_jd_solanki">
   </a>
</p>

## Installation 🛠️

Add anu-vue and its supporting libraries

```bash
pnpm add anu-vue && pnpm add -D unocss @unocss/preset-uno @unocss/preset-icons @iconify-json/bx
```

Create UnoCSS Config file uno.config.ts in the root of the project with the below content:

```ts
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
        'height': '1.5em',
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

> **Note**
> Update presentIcon's `height` property according line height in your app using em unit.

e.g. For VitePress line height of paragraph is 24px. Hence, we have height of 1.5em in docs.

Update your main.ts file like below

```ts
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

## Future 🔮

I will continue to develop this project if I get a positive response. I will introduce more components and amazing things like configurable array if I will be able to spend more time on OSS development.

When I will have:

### At least one sponsor

- [ ] I will start sponsoring one of contributors of UnoCSS/VueUse.

### 5 non doc contribution

- [ ] Write contribution guide

### Github stars

- [ ] 100+
  - [ ] More components like avatar, progress
- [ ] 500+
  - [ ] Write tests using [vitest](https://vitest.dev/)

Help me do full-time Open source by sponsoring me.

If you like this lib do give it a star or spread some words on Twitter.

Thanks 🙏

> NOTE: You might notice I need some help with TS with current codebase. This is because I have little experience with TS & I don't want to invest too much in it, at first I want to know how far anu can go.
