# Installation

## Adding library

1. Add `anu-vue` and its supporting libraries

    ```bash
    # pnpm
    pnpm add anu-vue @anu-vue/preset-theme-default && pnpm add -D unocss sass @iconify-json/bx

    # yarn
    yarn add anu-vue @anu-vue/preset-theme-default && yarn add -D unocss sass @iconify-json/bx

    # npm
    npm install anu-vue @anu-vue/preset-theme-default && npm install -D unocss sass @iconify-json/bx
    ```

:::info
As of v0.11.0, we need to install `sass` as dev dependency. This will be no longer needed in upcoming version.
:::

## Usage

1. Add UnoCSS to `vite.config.js`

    ```ts
    import Unocss from 'unocss/vite'

    export default {
      plugins: [
        Unocss(),
      ],
    }
    ```

2. Create UnoCSS Config file `uno.config.js` in root of the project with below content:

    ```ts
    import { presetAnu, presetIconExtraProperties } from 'anu-vue'
    import { presetThemeDefault } from '@anu-vue/preset-theme-default'
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
          extraProperties: presetIconExtraProperties,
        }),

        // anu-vue preset
        presetAnu(),

        // default theme preset
        presetThemeDefault(),
      ],
      include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
    })
    ```

3. Update your `main.js` file like below:

    ```js{3,5-6,8-9,13,11-12,15-16}
    import { createApp } from 'vue'
    import App from './App.vue'
    import { anu } from 'anu-vue'

    // UnoCSS import
    import 'uno.css'

    // anu styles
    import 'anu-vue/dist/style.css'

    // default theme styles
    import '@anu-vue/preset-theme-default/dist/styles.scss'

    // Using `app.use(anu)` will register all the components globally
    createApp(App)
      .use(anu, { registerComponents: true })
      .mount('#app')
    ```

It's done! 🥳

Now, Just refer to the component in your vue files:

```vue
<template>
  <ABtn>Button</ABtn>
</template>
```

<br>

---

<br>

Probably you might not want to globally register the components. You can also follow below approaches:

### Tree Shaking

You can also follow À la carte fashion if you don't want to register all the components globally.

1. Remove anu plugin use in `main.js` file.

    ```diff
    -  import { anu } from 'anu-vue'

      createApp(App)
    -   .use(anu, { registerComponents: true })
        .mount('#app')
    ```

2. Now, import components individually from `anu-vue`

    ```vue
    <script setup>
    import { ABtn } from 'anu-vue'
    </script>

    <template>
      <ABtn>Primary</ABtn>
    </template>
    ```

### Auto importing components w/ Tree shaking

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) lets you auto import components on demand. With this you can omit import statement and still get benefits of tree shaking.

1. Remove anu plugin use in `main.js` file if you haven't

    ```diff
    -  import { anu } from 'anu-vue'

      createApp(App)
    -   .use(anu, { registerComponents: true })
        .mount('#app')
    ```

2. Install unplugin-vue-components:

    ```shell
    # pnpm
    pnpm add -D unplugin-vue-components

    # yarn
    pnpm add -D unplugin-vue-components

    # npm
    npm i -D unplugin-vue-components
    ```

3. Add following in `vite.config.js`:

    ```js
    // other imports
    import Components from 'unplugin-vue-components/vite'
    import { AnuComponentResolver } from 'anu-vue'

    export default defineConfig({
      plugins: [
        // other plugins
        Components({
          resolvers: [
            AnuComponentResolver()
          ]
        }),
      ],
    
      // other config
    })
    ```

4. Now, just use components the component and it will be auto imported on demand 🤯

    ```vue
    <template>
      <ABtn>Primary</ABtn>
    </template>
    ```

## Nuxt

1. instead of installing `anu-vue` package, install `@anu-vue/nuxt`.

    ```bash
    # pnpm
    pnpm add @anu-vue/nuxt && pnpm add -D sass

    # yarn
    yarn add @anu-vue/nuxt && yarn add -D sass

    # npm
    npm install @anu-vue/nuxt && npm install -D sass
    ```

:::info
As of v0.11.0, we need to install `sass` as dev dependency. This will be no longer needed in upcoming version.
:::

1. Add Anu & UnoCSS in nuxt modules

    ```ts
    import { defineNuxtConfig } from 'nuxt/config'

    export default defineNuxtConfig({
      modules: ['@anu-vue/nuxt', '@unocss/nuxt'],
    })
    ```

2. Add UnoCSS config file `uno.config.js` as shown in step 2 of [usage](#usage) section.
3. Using [Preset](/guide/features/presets.md),
   1. If you are going to use `preset-theme-default`, first install it.

      ```bash
      # pnpm
      pnpm add @anu-vue/preset-theme-default

      # yarn
      yarn add @anu-vue/preset-theme-default

      # npm
      npm install @anu-vue/preset-theme-default
      ```

   2. Include CSS in `nuxt.config.js`.

      ```diff
        import { defineNuxtConfig } from 'nuxt/config'
        
        export default defineNuxtConfig({
          modules: ['@anu-vue/nuxt', '@unocss/nuxt'],
      +   css: ['@anu-vue/preset-theme-default/dist/styles.scss'],
        })
      ```

   3. Make sure you have add `preset-theme-default` as preset in `uno.config.js` file.

## Volar Support

If you are using [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar), you can specify global component types by adding below configuration in your [`jsconfig.json`](https://code.visualstudio.com/docs/languages/jsconfig).

```json
{
  "compilerOptions": {
    // ...
    "types": ["anu-vue/volar"]
  }
}
```

If you have typescript project, you have to configure above in `tsconfig.json` file.

That's it, enjoy the autocompletion 🥳
