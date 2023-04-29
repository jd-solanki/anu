<script lang="ts" setup>
import api from '@anu/component-meta/ATypography.json';
</script>

# Typography

<!-- 👉 Classes -->
::::card Classes

Anu provides useful classes like `.a-title` & `.a-subtitle` for rendering typography with consistency.

:::code DemoTypographyClasses
<<< @/components/demos/typography/DemoTypographyClasses.vue
:::

::::

<!-- 👉 Basic -->
:::::card Basic

`ATypography` component provides customizable typography to render title, subtitle & text using single component.

You might feel like this is useless but this greatly improves DX and boosts component reusability. This will completely change how you work with typography.

::::code DemoTypographyBasic
<<< @/components/demos/typography/DemoTypographyBasic.vue
::::

::::after-demo
:::details When not to use `ATypography` component?
If you want to render either title, subtitle or text only, prefer using respective class (_for text you don't need any class, please read below note_) instead of component.

`ATypography` is for rendering title, subtitle & text easily or adding custom content on right via `header-right` slot.

In summary, it provides common structure (_flex_) we use in our apps regularly.
:::

:::details `ATypography`'s `text` prop
`text` prop is for convenience so you don't have to do this:

```vue
<template>
  <ATypography
    title="Title"
    subtitle="This is subtitle"
  >
    <p>This is text</p>
  </ATypography>
</template>
```

Instead you can just insert text using `text` prop.

```vue
<template>
  <ATypography
    title="Title"
    subtitle="This is subtitle"
    text="This is text"
  />
</template>

```

When you use `text` prop of `ATypography` component, it adds class `.a-text` to customize that particular text rendered using `ATypography` component.
:::
::::

:::::

<!-- 👉 Sizing -->
::::card Sizing

Want to create a list with title and subtitle no worries, Just add `text-sm`.

You can use other font-size utilities to change typography size.

:::code DemoTypographySizing
<<< @/components/demos/typography/DemoTypographySizing.vue{7,12,14,20,25,27,33,38,40}
:::

::::

<!-- 👉 Config Array -->
::::card Config Array

You can configure title, subtitle & text by passing array as prop instead of string.

First element of array will be treated as content and rest of them will be classes. You can create various layout using custom classes without writing same markup.

It greatly improves DX and keep you code a bit DRY.

:::code DemoTypographyConfigArray
<<< @/components/demos/typography/DemoTypographyConfigArray.vue{11-12,23-24,36-37,49-50}
:::

::::

<!-- 👉 API -->
## API

<Api title="Typography" :api="api"></Api>
