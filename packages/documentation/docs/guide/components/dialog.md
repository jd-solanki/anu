# Dialog

<!-- 👉 Basic -->
<Demo>

## Basic

`ADialog` component uses `ACard` as its base. Bind `ADialog` with `v-model` to hide and show dialog/card.

All props & slots available in `ACard` is available in `ADialog`.

<DemoDialogBasic />

<template #code>

<<< @/demos/dialog/DemoDialogBasic.vue

</template>

</Demo>

<!-- 👉 Placement -->
<!-- <Demo>

## Placement

You can adjust dialog placement via `place-items-start top-16 justify-center` classes.

`place-items-start` will align dialog to top. `justify-center` will center dialog horizontally. Finally, add top utility class to adjust the placements.

<DemoDialogPlacement />

<template #code>

<<< @/demos/dialog/DemoDialogPlacement.vue

</template>

</Demo> -->

<!-- 👉 Width -->
<Demo>

## Width

Use width utility classes with `children` variant to provide custom width to dialog. e.g. `children:w-[800px]`.

<DemoDialogWidth />

<template #code>

<<< @/demos/dialog/DemoDialogWidth.vue

</template>

</Demo>

<!-- 👉 Persistent -->
<Demo>

## Persistent

You can disable closing dialog on outside click via `persistent` prop.

<DemoDialogPersistent />

<template #code>

<<< @/demos/dialog/DemoDialogPersistent.vue

</template>

</Demo>
