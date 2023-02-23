<script lang="ts" setup>
import api from '@anu/component-meta/ABadge.json';
</script>

# Badge

<!-- 👉 Default -->
::::card Default

Default color for badge is `primary`.

:::code DemoBadgeDefault
<<< @/components/demos/badge/DemoBadgeDefault.vue
:::

::::

<!-- 👉 Content -->
::::card Content

Use the prop `content` to pass numeric values, if you want to use other data different than a number use the slot `content` instead.

:::code DemoBadgeContent
<<< @/components/demos/badge/DemoBadgeContent.vue{3,8}
:::

::::

<!-- 👉 v-model support -->
::::card v-model support

You can use v-model to control hiding/showing the badge.

:::code DemoBadgeVModel
<<< @/components/demos/badge/DemoBadgeVModel.vue{4,9}
:::

::::

<!-- 👉 Color -->
::::card Color

You can use the `color` prop to change the badge color.

:::code DemoBadgeColor
<<< @/components/demos/badge/DemoBadgeColor.vue{5,11,17,23,29}
:::

::::

<!-- 👉 Dot -->
::::card Dot

Use the prop `dot` to transform the badge into a dot.

:::code DemoBadgeDot
<<< @/components/demos/badge/DemoBadgeDot.vue{3}
:::

::::

<!-- 👉 Anchor origin -->
::::card Anchor origin

Change the position of the badge by passing `top/bottom` and `left/right` values to the `anchor` prop.

:::code DemoBadgeAnchor
<<< @/components/demos/badge/DemoBadgeAnchor.vue{5,11,17,23}
:::

::::

<!-- 👉 Max -->
::::card Max

Change the `max` prop to cap the numeric value of the content.

:::code DemoBadgeMax
<<< @/components/demos/badge/DemoBadgeMax.vue{5,11,17}
:::

::::

<!-- 👉 Overlap -->
::::card Overlap

Use `overlap` prop to adjust the position of the badge, if you need more refined adjustments you can use the `offsetX` or `offsetY` props.

By default `overlap` prop is `true`.

:::code DemoBadgeOverlap
<<< @/components/demos/badge/DemoBadgeOverlap.vue{10,18-19}
:::

::::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust badge roundness using border-radius utilities.

:::code DemoBadgeRoundness
<<< @/components/demos/badge/DemoBadgeRoundness.vue{5,13,21,29}
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

You can use font-size utility to adjust the size of badge.

:::code DemoBadgeSizing
<<< @/components/demos/badge/DemoBadgeSizing.vue{4,13,22,31}
:::

::::

<!-- 👉 API -->
## API

<Api title="Badge" :api="api"></Api>
