# Theme

Anu officially supports light & dark theme. Anu also allows users to customize the appearance of their application by providing a custom theme or modifying the existing.

This is achieved through the use of CSS variables, which can be defined and modified at runtime. This means that users can change the theme of their application on the fly. This allows for a more flexible and dynamic user experience, as users can tailor the appearance of their application to their personal preferences or to match the branding of their organization.

Light theme is enabled by default. If you want to switch to dark mode just apply `.dark` class to root `html` element.

```html
<html class="dark">
    <!-- ... -->
</html>
```

You can check list of available CSS variables in [preset-theme-default](https://github.com/jd-solanki/anu/blob/main/packages/preset-theme-default/src/scss/index.scss).

## How to customize the theme?

To customize any of the existing theme, light or dark, you just have to override the CSS variable.

Assume your theme color is `#5563fd`. Just convert it to [hsl](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) format and override the `--a-primary` root CSS variable in your stylesheet.

```vue{6}
<!-- App.vue -->
<template>
    <ABtn>Button</ABtn>
</template>

<style>
:root {
    --a-primary: 235, 97.7%, 66.3%;
}
</style>
```

Done 🥳

If you want to change CSS variant in dark theme just update the selector:

```diff
- :root
+ :root.dark
```

## How to create custom theme?

Creating custom theme is as easy as defining new values for existing CSS variables.

Create new CSS selector for `:root` with theme name (assuming `coffee`) and write down CSS variables with desired values:

```css
:root.coffee {
    ---a-primary: 27, 39%, 77%,
    /* other CSS variables */
}
```

Now just add class `coffee` to html element: `html.coffee`.

Don't forget to include the CSS file in your entrypoint 😜
