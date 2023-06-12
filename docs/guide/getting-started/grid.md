# Grid

<!-- 👉 Row -->
:::::card Rows & Columns

Anu's grid uses [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) for creating rows & columns.

UnoCSS provides various utility classes for creating CSS grid layout.

For creating row, you need `grid`, `gap-4` & `place-items-start` classes. Anu's default theme preset provides `grid-row` [shortcut](https://unocss.dev/config/shortcuts) for adding these classes.

For columns you can use utility classes according to your column needs.

::::code DemoGridRow
<<< @/components/demos/grid/DemoGridRow.vue{2}
::::

::::after-demo
:::tip
With CSS grid you don't have to add `col` related classes like `col-6` to children of row, You can set amount of columns along with `grid-row` using grid column classes like `grid-cols-4`.
:::
::::

:::::

<!-- 👉 Responsive Grid -->
:::::card Responsive Grid

You can use responsive variants to create responsive grid.

::::code DemoGridResponsiveGrid
<<< @/components/demos/grid/DemoGridResponsiveGrid.vue{2}
::::

::::after-demo

:::tip
Previously with flex based grid, if you want column content to expand full width you have to write `w-full` to each column children.

```html{3,6}
<div class="row">
    <div class="col-6">
        <div class="w-full"></div>
    </div>
    <div class="col-6">
        <div class="w-full"></div>
    </div>
</div>
```

However, with our grid, you can achieve the same by adding `justify-items-stretch` class to grid itself.

```html{1}
<div class="grid-row grid-cols-2 justify-items-stretch">
    <div></div>
    <div></div>
</div>
```

<p class="!mt-4">OMG! How much boilerplate code we removed 😎🥳</p>

:::

::::

:::::

<!-- 👉 Breakpoints -->
:::card Breakpoints

| Breakpoint | Minimum width | CSS                                  |
| ---------- | ------------- | ------------------------------------ |
| sm         | 640px         | `@media (min-width: 640px) { ... }`  |
| md         | 768px         | `@media (min-width: 768px) { ... }`  |
| lg         | 1024px        | `@media (min-width: 1024px) { ... }` |
| xl         | 1280px        | `@media (min-width: 1280px) { ... }` |
| 2xl        | 1536px        | `@media (min-width: 1536px) { ... }` |

:::

<!-- 👉 Bootstrap Grid -->
:::card Bootstrap Grid
If you aren't comfortable with CSS grid based grid then you can use Bootstrap like grid via [`unocss-preset-grid`](https://github.com/StatuAgency/unocss-preset-grid) preset.
:::

<!-- 👉 Learning CSS Grid -->
:::card Learning CSS Grid

- [CSS Tricks - A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [web.dev - Grid](https://web.dev/learn/css/grid/)
- [MDN - CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

:::
