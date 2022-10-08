# Badge

<!-- 👉 Default -->
::::card Default

Default variant for badge is `standard`

:::code DemoBadgeDefault
<<< @/demos/badge/DemoBadgeDefault.vue
:::

::::

<!-- 👉 Color -->
::::card Content

Use the prop `badgeContent` to pass numeric values, if you want to use other data different than a number use the slot `badgeContent` instead

:::code DemoBadgeContent
<<< @/demos/badge/DemoBadgeContent.vue
:::

::::

<!-- 👉 Content -->
::::card Color

You can use `color` prop to change the badge color.

:::code DemoBadgeColor
<<< @/demos/badge/DemoBadgeColor.vue
:::

::::

<!-- 👉 Dot -->
::::card Dot

Use the prop `variant` to transform the badge into a `dot`

:::code DemoBadgeDot
<<< @/demos/badge/DemoBadgeDot.vue
:::

::::

<!-- 👉 Anchor origin -->
::::card Anchor origin

Change the position of the badge by passing `horizontal` and `vertical` values to the `anchor` prop.

:::code DemoBadgeAnchor
<<< @/demos/badge/DemoBadgeAnchor.vue
:::

::::

<!-- 👉 Max -->
::::card Max

Change the `max` prop to cap the numeric value of the content

:::code DemoBadgeMax
<<< @/demos/badge/DemoBadgeMax.vue
:::

::::

<!-- 👉 Overlap -->
::::card Overlap

Use `overlap` prop to adjust the position of the badge, if you need more refined adjustments you can use the `offsetX` or `offsetY` props.

By default of `overlap` prop is `true`.

:::code DemoBadgeOverlap
<<< @/demos/badge/DemoBadgeOverlap.vue
:::

::::
