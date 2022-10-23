# Badge

<!-- 👉 Default -->
::::card Default

Default variant for badge is `standard`

:::code DemoBadgeDefault
<<< @/demos/badge/DemoBadgeDefault.vue
:::

::::

<!-- 👉 Content -->
::::card Content

Use the prop `content` to pass numeric values, if you want to use other data different than a number use the slot `content` instead

:::code DemoBadgeContent
<<< @/demos/badge/DemoBadgeContent.vue{4,15,20}
:::

::::

<!-- 👉 v-model support -->
::::card v-model support

You can use v-model to control hiding/showing the badge

:::code DemoBadgeVModel
<<< @/demos/badge/DemoBadgeVModel.vue{4,9}
:::

::::

<!-- 👉 Color -->
::::card Color

You can use `color` prop to change the badge color.

:::code DemoBadgeColor
<<< @/demos/badge/DemoBadgeColor.vue{5,11,17,23,29}
:::

::::

<!-- 👉 Dot -->
::::card Dot

Use the prop `variant` to transform the badge into a `dot`

:::code DemoBadgeDot
<<< @/demos/badge/DemoBadgeDot.vue{3}
:::

::::

<!-- 👉 Anchor origin -->
::::card Anchor origin

Change the position of the badge by passing `horizontal` and `vertical` values to the `anchor` prop.

:::code DemoBadgeAnchor
<<< @/demos/badge/DemoBadgeAnchor.vue{5,11,17,23}
:::

::::

<!-- 👉 Max -->
::::card Max

Change the `max` prop to cap the numeric value of the content

:::code DemoBadgeMax
<<< @/demos/badge/DemoBadgeMax.vue{5,11,17}
:::

::::

<!-- 👉 Overlap -->
::::card Overlap

Use `overlap` prop to adjust the position of the badge, if you need more refined adjustments you can use the `offsetX` or `offsetY` props.

By default of `overlap` prop is `true`.

:::code DemoBadgeOverlap
<<< @/demos/badge/DemoBadgeOverlap.vue{10,18-19}
:::

::::
