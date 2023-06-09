# Vue

:::card Installation

1. Add `anu-vue` and its supporting libraries

    ```bash
    # pnpm
    pnpm add anu-vue @anu-vue/preset-theme-default && pnpm add -D unocss @iconify-json/bx

    # yarn
    yarn add anu-vue @anu-vue/preset-theme-default && yarn add -D unocss @iconify-json/bx

    # npm
    npm i anu-vue @anu-vue/preset-theme-default && npm install -D unocss @iconify-json/bx
    ```

:::

:::card Usage

1. Add UnoCSS to `vite.config.js`

    ```ts
    import Unocss from 'unocss/vite'

    export default {
      plugins: [
        Unocss(),
      ],
    }
    ```

2. Create the UnoCSS Config file `uno.config.js` in the root of the project with the content below:

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

3. Update your `main.js` file as shown below:

    ```js{3,5-6,8-9,13,11-12,15-16}
    import { createApp } from 'vue'
    import App from './App.vue'
    import { anu } from 'anu-vue'

    // UnoCSS import
    import 'uno.css'

    // anu styles
    import 'anu-vue/dist/style.css'

    // default theme styles
    import '@anu-vue/preset-theme-default/dist/style.css'

    // Using `app.use(anu)` will register anu plugin
    createApp(App)
      .use(anu)
      .mount('#app')
    ```

It's done! 🥳

Now, Just refer to the component in your vue files:

```vue
<template>
  <ABtn>Button</ABtn>
</template>
```

<em class="block mt-12 mb-10">Probably you might not want to globally register the components. You can also follow the approaches below:</em>

### Tree Shaking

You can also follow À la carte fashion if you don't want to register all the components globally.

1. Set `registerComponents` option to `false` while registering anu plugin.

    ```diff
      import { anu } from 'anu-vue'

      createApp(App)
    -   .use(anu)
    +   .use(anu, { registerComponents: false })
        .mount('#app')
    ```

2. Now import the components individually from `anu-vue`

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

1. Make sure to set `registerComponents` to `false` in the `main.js` file if you haven't

    ```diff
      import { anu } from 'anu-vue'

      createApp(App)
    -   .use(anu)
    +   .use(anu, { registerComponents: false })
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

3. Add the following in `vite.config.js`:

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

4. Now just use the component and it will be auto imported on demand 🤯

    ```vue
    <template>
      <ABtn>Primary</ABtn>
    </template>
    ```

:::

:::card Volar Support

If you are using [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar), you can specify global component types by adding the configuration below in your [`jsconfig.json`](https://code.visualstudio.com/docs/languages/jsconfig).

```json
{
  "compilerOptions": {
    // ...
    "types": ["anu-vue/volar"]
  }
}
```

If you have a typescript project, you will have to configure the above in the `tsconfig.json` file.

That's it, enjoy the autocompletion 🥳

:::
