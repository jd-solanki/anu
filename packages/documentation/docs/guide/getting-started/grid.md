# Grid

<!-- 👉 Row -->
<Demo>

## Rows & Columns

Anu's grid uses [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) for creating rows & columns.

UnoCSS provides various utility classes for creating CSS grid layout.

For creating row, you need `grid`, `gap-4` & `place-items-start` classes. Anu's default theme preset provides `grid-row` [shortcut](https://github.com/unocss/unocss#shortcuts) for adding these classes.

For columns you can use utility classes according to your column needs.

<DemoGridRow />

<template #code>

<<< @/demos/grid/DemoGridRow.vue

</template>

</Demo>

<!-- 👉 Responsive Grid -->
<Demo>

## Responsive Grid

You can use responsive variants to create responsive grid.

:::details View Breakpoints

| Breakpoint | Minimum width | CSS                                  |
| ---------- | ------------- | ------------------------------------ |
| sm         | 640px         | `@media (min-width: 640px) { ... }`  |
| md         | 768px         | `@media (min-width: 768px) { ... }`  |
| lg         | 1024px        | `@media (min-width: 1024px) { ... }` |
| xl         | 1280px        | `@media (min-width: 1280px) { ... }` |
| 2xl        | 1536px        | `@media (min-width: 1536px) { ... }` |

:::

<DemoGridResponsiveGrid />

<template #code>

<<< @/demos/grid/DemoGridResponsiveGrid.vue

</template>

</Demo>
