# Drawer

<!-- 👉 Basic -->
<Demo>

## Basic

`ADrawer` component uses `ACard` as its base. Bind `ADrawer` with `v-model` to hide and show drawer/card.

All props & slots available in `ACard` is available in `ADrawer`.

<DemoDrawerBasic />

<template #code>

<<< @/demos/drawer/DemoDrawerBasic.vue

</template>

</Demo>

<!-- 👉 Anchor -->
<Demo>

## Anchor

You can change the position of the drawer by providing the values `left` or `right` to the `anchor` prop.

<DemoDrawerAnchor />

<template #code>

<<< @/demos/drawer/DemoDrawerAnchor.vue

</template>

</Demo>

<!-- 👉 Width -->
<Demo>

## Width

Use width utility classes with `children` variant to provide custom width to drawer. e.g. `children:w-[800px]`.

<DemoDrawerWidth />

<template #code>

<<< @/demos/drawer/DemoDrawerWidth.vue

</template>

</Demo>

<!-- 👉 Persistent -->
<Demo>

## Persistent

You can disable closing drawer on outside click via `persistent` prop.

<DemoDrawerPersistent />

<template #code>

<<< @/demos/drawer/DemoDrawerPersistent.vue

</template>

</Demo>