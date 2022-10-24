# Chip

<!-- 👉 Filled -->
::::card Filled

`fill` is default variant for chip.

Use `color` prop to change the button color.

:::code DemoChipFilled
<<< @/demos/chip/DemoChipFilled.vue{4,7,10,13}
:::

::::

<!-- 👉 Outlined -->
::::card Outlined

You can use `variant="outline"` to create outlined chip.

:::code DemoChipOutlined
<<< @/demos/chip/DemoChipOutlined.vue{4,10,16,22,28}
:::

::::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust chip roundness using border-radius utilities.

:::code DemoChipRoundness
<<< @/demos/chip/DemoChipRoundness.vue{4,11,18,25}
:::

::::

<!-- 👉 Closable -->
::::card Closable

You can use `closable` to be able to close the chip.

:::code DemoChipClosable
<<< @/demos/chip/DemoChipClosable.vue{4-10,21}
:::

::::

<!-- 👉 Icon -->
::::card Icon

You can use `icon` prop to render icon in chip.

Use `append-icon` prop to render icon after default slot.

:::code DemoChipIcon
<<< @/demos/chip/DemoChipIcon.vue{3,8,14,20,26}
:::

::::

<!-- 👉 Click Action -->
::::card Click Action

Chip can be used as action item. You can use `@click` directive to handle onClick event.

:::code DemoChipOnClick
<<< @/demos/chip/DemoChipOnClick.vue{13}
:::

::::
