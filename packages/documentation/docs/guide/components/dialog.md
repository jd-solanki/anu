# Dialog

<!-- 👉 Basic -->
::::card Basic

`ADialog` component uses `ACard` as its base. Bind `ADialog` with `v-model` to hide and show dialog/card.

All props & slots available in `ACard` is available in `ADialog`.

:::code DemoDialogBasic
<<< @/demos/dialog/DemoDialogBasic.vue
:::

::::

<!-- 👉 Placement -->
<!-- ::::card Placement

You can adjust dialog placement via `place-items-start top-16 justify-center` classes.

`place-items-start` will align dialog to top. `justify-center` will center dialog horizontally. Finally, add top utility class to adjust the placements.

:::code DemoDialogPlacement
<<< @/demos/dialog/DemoDialogPlacement.vue
:::

:::: -->

<!-- 👉 Width -->
::::card Width

Use width utility classes to provide custom width to dialog. e.g. `w-[800px]`.

:::code DemoDialogWidth
<<< @/demos/dialog/DemoDialogWidth.vue
:::

::::

<!-- 👉 Persistent -->
::::card Persistent

You can disable closing dialog on outside click via `persistent` prop.

:::code DemoDialogPersistent
<<< @/demos/dialog/DemoDialogPersistent.vue
:::

::::
