# Theme

::::card Introduction

Anu officially supports light & dark theme. Anu also allows users to customize the appearance of their application by providing a custom theme or modifying the existing.

This is achieved through the use of CSS variables, which can be defined and modified at runtime (via `useAnu` composable). This means that users can change the theme of their application on the fly. This allows for a more flexible and dynamic user experience, as users can tailor the appearance of their application to their personal preferences or to match the branding of their organization.

Light theme is enabled by default. If you want to switch to dark mode use `initialTheme` option while registering anu.

```ts{9-11}
import { createApp } from 'vue'
import App from './App.vue'
import { anu } from 'anu-vue'

// other stuff

const app = createApp(App)

app.use(anu, {
  initialTheme: 'dark',
})
```

:::details Retrieving configured (plugin) options
In rare case if you ever want to retrieve the configured options, you can use [`inject`](https://vuejs.org/guide/components/provide-inject.html#provide-inject) like below.

```vue
<script lang="ts" setup>
import { ANU_CONFIG, PluginOptions } from 'anu-vue';
import { inject } from 'vue';

const config = inject<PluginOptions>(ANU_CONFIG)
console.log(config)
</script>
```

:::

::::

:::card How to customize the theme?

To customize any of the existing theme, light or dark, you just have to override the theme option.

Assume your theme color is `#5563fd`. Just convert it to [hsl](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) format and override the `primary` color via anu options.

```ts{5}
app.use(anu, {
  themes: {
    light: {
      colors: {
        primary: '235, 98%, 66%',
      },
    },
  },
})
```

Done 🥳

Do note that, this will only update the primary color for light theme.

:::

:::card How to create custom theme?

Creating a custom theme is as easy as defining new values for the existing theme colors.

Create a new CSS selector for `:root` with the theme name (assuming `coffee`) and write down the CSS variables with the desired values:

```ts{5}
app.use(anu, {
  themes: {
    class: 'a-theme-coffee',
    coffee: {
      colors: {
        primary: '27, 39%, 77%',
        // other theme colors
      },
    },
  },
})
```

Now just add class `coffee` to the html element: `html.coffee`.

Don't forget to include the CSS file in your entrypoint 😜

:::

::::card How to add new color?

Anu provides **primary**, **success**, **info**, **warning** & **danger** colors by default.

Additionally, you can also add new colors to the palette. Add new color to the palette via theme option:

```ts{5,10}
app.use(anu, {
  themes: {
    light: {
      colors: {
        secondary: '0, 0%, 50%',
      },
    },
    dark: {
      colors: {
        secondary: '0, 0%, 25%',
      },
    },
  },
})
```

Passing options to anu config will merge them and will result in new color **secondary** added to existing theme palette.

Additionally, You also have to add this new color in Anu's UnoCSS preset option as styles are generated via UnoCSS.

```ts
// file: uno.config.ts

import { presetAnu } from 'anu-vue'
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    // other presets
    presetAnu({
      // Add new color, It will get merged with existing colors
      colors: ['secondary'],
    }),
  ]
})
```

Finally let's use new color 😍

```vue
<template>
  <ABtn color="secondary">Secondary</ABtn>
</template>
```

<br>

---

<br>

:::tip Default Colors
You can get array of default colors provide by anu from `defaultThemeColors` export.

```ts
import { defaultThemeColors } from 'anu-vue'
```

:::

::::

:::card Adding Theme Based CSS Variables

You can also add theme based CSS variables. For example, Anu already adds `--a-body-bg-c` & `--a-surface-c` via theme.

```ts{5-8,13-14}
app.use(anu, {
  themes: {
    light: {
      cssVars: {
        'body-bg-c': '0,4.8%,95.9%',

        // ℹ️ Used for background on body like select options, card, etc
        'surface-c': '0, 0%, 100%',
      },
    },
    dark: {
      cssVars: {
        'body-bg-c': 'var(--a-primary-hue), 15%, 5%',
        'surface-c': 'var(--a-primary-hue), 7%, 10%',
      },
    },
  },
})
```

Adding CSS vars will result in `--a-body-bg-c` & `--a-surface-c` being added to the theme CSS variables.

:::

:::card

Related documentation:

- [`useAnu` composable](/guide/composables/useAnu.md)
- [Colors](/guide/getting-started/customization.html#color)

:::
