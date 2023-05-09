# `useSelection`

<!-- 👉 Basic -->
::::card Basic

`useSelection` allows you to create `v-model` like binding for a group.

You can use `multi` property to enable selecting multiple values from options.

:::code DemoUseSelectionBasic
<<< @/components/demos/composables/useSelection/DemoUseSelectionBasic.vue{6-9}
:::

::::

<!-- 👉 Indexed -->
::::card Indexed

You can also create options without predefined value. Pass any positive number to `options` property and it will create index based options.

:::code DemoUseSelectionIndexed
<<< @/components/demos/composables/useSelection/DemoUseSelectionIndexed.vue{4}
:::

::::

<!-- 👉 Object -->
::::card Object

description

:::code DemoUseSelectionObject
<<< @/components/demos/composables/useSelection/DemoUseSelectionObject.vue{4-11}
:::

::::
