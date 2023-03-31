<script lang="ts" setup>
import api from '@anu/component-meta/ABtn.json';
</script>

# Button

<!-- 👉 Filled -->
::::card Filled

`fill` is default variant for button.

Use `color` prop to change the button color.

:::code DemoButtonFilled
<<< @/components/demos/button/DemoButtonFilled.vue{5,9,13,17}
:::

::::

<!-- 👉 Outlined -->
:::::card Outlined

You can use `variant="outline"` to create outlined button.

::::code DemoButtonOutlined
<<< @/components/demos/button/DemoButtonOutlined.vue{3,9,16,23,30}
::::

::::after-demo
:::details Customize `border-style` of outlined buttons
To create outlined button with different border style just add relevant class.

e.g. To create outline button with dashed border, add `border-dashed` class.
:::
::::

:::::

<!-- 👉 Light -->
::::card Light

You can use `variant="light"` to create button with light background _(Background with opacity)_.

:::code DemoButtonLight
<<< @/components/demos/button/DemoButtonLight.vue{3,9,16,23,30}
:::

::::

<!-- 👉 Text -->
::::card Text

Use `variant="text"` to create a text button.

:::code DemoButtonText
<<< @/components/demos/button/DemoButtonText.vue{3,8,15,22,29}
:::

::::

<!-- 👉 Icons -->
:::::card Icons

You can use `icon` prop to render icon in button.

Use `append-icon` prop to render icon after default slot.

::::code DemoButtonIcons
<<< @/components/demos/button/DemoButtonIcons.vue{4,10,17,23,33,41,49,57,67,75,83,91}
::::

::::after-demo
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
::::

:::::

<!-- 👉 Block -->
::::card Block

Add `w-full` class to make block button.

:::code DemoButtonBlock
<<< @/components/demos/button/DemoButtonBlock.vue{3,7}
:::

::::

<!-- 👉 Icon Only -->
::::card Icon Only

Use `icon-only` prop to render icon with icon only button.

:::code DemoButtonIconOnly
<<< @/components/demos/button/DemoButtonIconOnly.vue{4,10,16,22}
:::

::::

<!-- 👉 Sizing -->
:::::card Sizing

You can use font-size utility to adjust the size of button.

::::code DemoButtonSizing
<<< @/components/demos/button/DemoButtonSizing.vue{4,12,17}
::::

::::after-demo
:::tip
If you have container with bigger font size and need default sized button use `text-base` class.
:::
::::

:::::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust button roundness using border-radius utilities.

:::code DemoButtonRoundness
<<< @/components/demos/button/DemoButtonRoundness.vue{3,9,16,23,30}
:::

::::

<!-- 👉 Loading -->
::::card Loading

You can use the `loading` prop to inform about a background process or asynchronous operation.
This property will display a `ALoading` component (by default) instead of the icon and/or label of the button.

:::code DemoButtonLoading
<<< @/components/demos/button/DemoButtonLoading.vue{12,18-21,25}
:::

::::

<!-- 👉 API -->
## API

<Api title="Button" :api="api"></Api>
