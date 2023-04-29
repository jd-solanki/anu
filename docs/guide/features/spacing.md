# Spacing

::::card

There might be cases where using component libraries introduces several restrictions. Assume you want to reduce the overall spacing of the button but don't want to reduce the font size of it. With other frameworks, you have to manually adjust the padding, margin, height, etc to get the desired result.

However, Anu provides `--a-spacing` CSS variable to adjust the spacing of any component that supports this feature.

You can use `spacing-<number>` class to add/update `--a-spacing` CSS variable.

<ABtn class="spacing-80" variant="outline">Button</ABtn>

```vue{3}
<template>
  <ABtn
    class="spacing-80"
    variant="outline"
  >
    spacing-80
  </ABtn>
</template>
```

:::tip Wanna have some fun 😜
You can reduce overall spacing of all components by updating `--a-spacing` CSS var from `:root`

```css
:root {
  --a-spacing: 0.9;
}
```

:::

::::
