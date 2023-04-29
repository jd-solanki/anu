# `useAnu`

`useAnu` composable provides API for interactive with Anu.

:::card Basic

`useAnu` provides following reactive variables:

- `themes: ConfigThemes` => Registered themes. You can modify colors & CSS variables at runtime 😍
- `activeThemeName: string` => Name of the active theme in your app
- `activeTheme: ({ name: string, theme: ThemeOptions })` => Convenient computed property to get details of active theme. Don't modify it 🙅🏻‍♂️

```ts
import { useAnu } from 'anu-vue';

const { themes, activeThemeName, activeTheme } = useAnu()
```

:::

:::card Changing Active Theme

You can change the active theme at runtime by modifying the `activeThemeName` ref.

```ts{5}
import { useAnu } from 'anu-vue';

const { activeThemeName } = useAnu()

activeThemeName.value = 'dark'
```

:::

:::::card Active Theme Details

Use `activeTheme` computed property to get the details of active theme.

```ts{6-7}
import { computed } from 'vue';
import { useAnu } from 'anu-vue';

const { activeTheme } = useAnu()

const activeThemeName = computed(() => activeTheme.value.name)
const primaryColor = computed(() => activeTheme.value.theme.colors.primary)
```

<!-- ℹ️ We used after-demo slot to avoid unwanted mb -->
::::after-demo
:::warning
Modifying `activeTheme` computed property won't do anything so never mutate this computed property.
:::
::::

:::::

:::card Modifying Themes

You can modify any theme at runtime via `theme` ref.

```ts{8,12}
import { useAnu } from 'anu-vue';

const { themes } = useAnu()

// Change primary color for all themes
for (const themeName in themes.value) {
  const theme = themes.value[themeName]
  theme.colors.primary = '235, 97.7%, 66.3%'
}

// Or you can also change the primary color for single theme
themes.value.light.colors.primary = '235, 97.7%, 66.3%'
```

:::

:::card
Related documentation:

- [Theme](/guide/features/theme.md)
- [Colors](/guide/getting-started/customization.html#color)
:::
