# Card

<!-- 👉 Basic -->
<Demo>

## Basic

Card component uses [`ATypography`](/guide/base-components/typography) component for its typography.

Moreover, you can also use `.card-body` in default slot to render card content.

<DemoCardBasic />

<template #code>

<<< @/demos/card/DemoCardBasic.vue

</template>

</Demo>

<!-- 👉 Various Elements -->
<Demo>

## Various Elements

Mix and match the different components to achieve desired UI.

<DemoCardVariousElements />

<template #code>

<<< @/demos/card/DemoCardVariousElements.vue

</template>

</Demo>

<!-- 👉 Variants -->
<Demo>

## Variants

Card component uses layer composable as it's base. You can use `variant` prop to create various card variants.

<DemoCardVariants />

<template #code>

<<< @/demos/card/DemoCardVariants.vue

</template>

</Demo>

<!-- 👉 Slot -->
<Demo>

## Slot

You can use `ATypography` slots to render custom content in header.

<DemoCardSlot />

<template #code>

<<< @/demos/card/DemoCardSlot.vue

</template>

</Demo>

:::tip
Above demo adds content to the right of title. If you want to add content on the right of both title & subtitle use `headerRight` slot.
:::
