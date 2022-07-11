# Button

<!-- 👉 Filled -->
<Demo>

## Filled

`fill` is default variant for button.

<DemoButtonFilled />

<template #code>

<<< @/demos/button/DemoButtonFilled.vue

</template>

</Demo>

<!-- 👉 Outlined -->
<Demo>

## Outlined

You can use `variant="outline"` to create outlined button.

<DemoButtonOutlined />

<template #code>

<<< @/demos/button/DemoButtonOutlined.vue

</template>

</Demo>

<!-- 👉 Light -->
<Demo>

## Light

You can use `variant="light"` to create button with light background _(Background with opacity)_.

<DemoButtonLight />

<template #code>

<<< @/demos/button/DemoButtonLight.vue

</template>

</Demo>

<!-- 👉 Text -->
<Demo>

## Text

Use `variant="text"` to create a text button.

<DemoButtonText />

<template #code>

<<< @/demos/button/DemoButtonText.vue

</template>

</Demo>

<!-- 👉 Icons -->
<Demo>

## Icons

You can use `icon` prop to render icon in button.

Use `append-icon` prop to render icon after default slot.

<DemoButtonIcons />

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

<template #code>

<<< @/demos/button/DemoButtonIcons.vue

</template>

</Demo>

<!-- 👉 Block -->
<Demo>

## Block

Add `w-full` class to make block button.

<DemoButtonBlock />

<template #code>

<<< @/demos/button/DemoButtonBlock.vue

</template>

</Demo>

<!-- 👉 Icon Only -->
<Demo>

## Icon Only

Use `icon-only` prop to render icon with icon only button.

<DemoButtonIconOnly />

<template #code>

<<< @/demos/button/DemoButtonIconOnly.vue

</template>

</Demo>

<!-- 👉 Sizing -->
<Demo>

## Sizing

You can use font-size utility to adjust the size of button.

<DemoButtonSizing />

:::tip
If you have container with bigger font size and need default sized button use `text-base` class.
:::

<template #code>

<<< @/demos/button/DemoButtonSizing.vue

</template>

</Demo>

<!-- 👉 Roundness -->
<Demo>

## Roundness

You can adjust button roundness using border-radius utilities.

<DemoButtonRoundness />

<template #code>

<<< @/demos/button/DemoButtonRoundness.vue

</template>

</Demo>
