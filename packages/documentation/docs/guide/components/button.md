# Button

<!-- 👉 Filled -->
:::card Filled

`fill` is default variant for button.

:::code DemoButtonFilled
<<< @/demos/button/DemoButtonFilled.vue

:::

<!-- 👉 Outlined -->
::::card Outlined

You can use `variant="outline"` to create outlined button.

:::code DemoButtonOutlined
<<< @/demos/button/DemoButtonOutlined.vue
:::

::::

:::details Customize `border-style` of outlined buttons
To create outlined button with different border style just add relevant class.

e.g. To create outline button with dashed border, add `border-dashed` class.
:::

<!-- 👉 Light -->
::::card Light

You can use `variant="light"` to create button with light background _(Background with opacity)_.

:::code DemoButtonLight
<<< @/demos/button/DemoButtonLight.vue
:::

::::

<!-- 👉 Text -->
::::card Text

Use `variant="text"` to create a text button.

:::code DemoButtonText
<<< @/demos/button/DemoButtonText.vue
:::

::::

<!-- 👉 Icons -->
::::card Icons

You can use `icon` prop to render icon in button.

Use `append-icon` prop to render icon after default slot.

:::code DemoButtonIcons
<<< @/demos/button/DemoButtonIcons.vue
:::

::::
:::details You can also use default slot to render icon.

```vue
<template>
  <ABtn>
    <i class="i-bx-star" />
    <span>Primary</span>
  </ABtn>
</template>
```

:::

<!-- 👉 Block -->
::::card Block

Add `w-full` class to make block button.

:::code DemoButtonBlock
<<< @/demos/button/DemoButtonBlock.vue
:::

::::

<!-- 👉 Icon Only -->
::::card Icon Only

Use `icon-only` prop to render icon with icon only button.

:::code DemoButtonIconOnly
<<< @/demos/button/DemoButtonIconOnly.vue
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

You can use font-size utility to adjust the size of button.

:::code DemoButtonSizing
<<< @/demos/button/DemoButtonSizing.vue
:::

::::

:::tip
If you have container with bigger font size and need default sized button use `text-base` class.
:::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust button roundness using border-radius utilities.

:::code DemoButtonRoundness
<<< @/demos/button/DemoButtonRoundness.vue
:::

::::
