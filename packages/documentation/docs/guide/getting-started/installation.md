# Installation

## Adding library

1. Add `anu-vue` and its supporting libraries

    ```bash
    # pnpm
    pnpm add anu-vue && pnpm add -D unocss @iconify-json/bx

    # yarn
    yarn add anu-vue && yarn add -D unocss @iconify-json/bx

    # npm
    npm install anu-vue && npm install -D unocss @iconify-json/bx
    ```

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
            'display': 'inline-block',
          },
        }),

        // anu-vue presets
        presetCore(),
        presetThemeDefault(),
      ],
      include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
    })
    ```

    :::details Icon height alignment

    Update highlighted line in above code snippet according line height in your app using `em` unit.

    e.g. For VitePress line height of paragraph is `24px`. Hence, we have height of `1.5em` in docs.

    :::

3. Update your `main.js` file like below:

    ```js{3,5-6,8-9,13}
    import { createApp } from 'vue'
    import App from './App.vue'
    import { anu } from 'anu-vue'

    // UnoCSS import
    import 'uno.css'

    // import styles
    import 'anu-vue/dist/style.css'

    // Using `app.use(anu)` will register all the components globally
    createApp(App)
      .use(anu)
      .mount('#app')
    ```

It's done! 🥳


## Volar Support 
If you are using Volar, you can specify global component types by configuring compilerOptions.types in tsconfig.json.

// tsconfig.json
```json
{
  "compilerOptions": {
    // ...
    "types": ["anu-vue/volar"]
  }
}
```

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
    -   .use(anu)
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
    -   .use(anu)
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
