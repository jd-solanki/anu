# Button

<!-- 👉 Filled -->
::::card Filled

`fill` is default variant for button.

Use `color` prop to change the button color.

:::code DemoButtonFilled
<<< @/demos/button/DemoButtonFilled.vue{5,9,13,17}
:::

::::

<!-- 👉 Outlined -->
::::card Outlined

You can use `variant="outline"` to create outlined button.

:::code DemoButtonOutlined
<<< @/demos/button/DemoButtonOutlined.vue{3,9,16,23,30}
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
<<< @/demos/button/DemoButtonLight.vue{3,9,16,23,30}
:::

::::

<!-- 👉 Text -->
::::card Text

Use `variant="text"` to create a text button.

:::code DemoButtonText
<<< @/demos/button/DemoButtonText.vue{3,8,15,22,29}
:::

::::

<!-- 👉 Icons -->
::::card Icons

You can use `icon` prop to render icon in button.

Use `append-icon` prop to render icon after default slot.

:::code DemoButtonIcons
<<< @/demos/button/DemoButtonIcons.vue{4,10,17,23,33,41,49,57,67,75,83,91}
:::

::::
:::details You can also use default slot to render icon.

```vue{3}
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
<<< @/demos/button/DemoButtonBlock.vue{3,7}
:::

::::

<!-- 👉 Icon Only -->
::::card Icon Only

Use `icon-only` prop to render icon with icon only button.

:::code DemoButtonIconOnly
<<< @/demos/button/DemoButtonIconOnly.vue{4,10,16,22}
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

You can use font-size utility to adjust the size of button.

:::code DemoButtonSizing
<<< @/demos/button/DemoButtonSizing.vue{4,12,17}
:::

::::

:::tip
If you have container with bigger font size and need default sized button use `text-base` class.
:::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust button roundness using border-radius utilities.

:::code DemoButtonRoundness
<<< @/demos/button/DemoButtonRoundness.vue{3,9,16,23,30}
:::

::::
