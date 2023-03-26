<script lang="ts" setup>
import api from '@anu/component-meta/ARating.json';
</script>

# Rating

<!-- 👉 Basic -->
::::card Basic

Rating component allows users to rate content.

:::code DemoRatingBasic
<<< @/components/demos/rating/DemoRatingBasic.vue{4,8}
:::

::::

<!-- 👉 Colors -->
::::card Colors

You can use `color` prop to change the rating color.

:::code DemoRatingColor
<<< @/components/demos/rating/DemoRatingColor.vue{10}
:::

::::

<!-- 👉 Sizing -->
:::::card Sizing

You can use font-size utility to adjust the size of rating.

::::code DemoRatingSizing
<<< @/components/demos/rating/DemoRatingSizing.vue{11,15,19,21,24}
::::

::::after-demo
:::tip
You can use padding utilities along with `all:` variant (`all:px-3`) to increase the gap between each rating icon.
:::
::::

:::::

<!-- 👉 Custom icon -->
:::::card Custom icon

You can use custom icon by providing `empty-icon` and `full-icon` props.

::::code DemoRatingCustomIcon
<<< @/components/demos/rating/DemoRatingCustomIcon.vue{10-11}
::::

::::after-demo
:::tip
`ARating` component also supports `half-icon` prop to customize the half icon when using `halve` prop.
:::
::::

:::::

<!-- 👉 Halve -->
::::card Halve

You can use `halve` prop to allow half rating.

:::code DemoRatingHalve
<<< @/components/demos/rating/DemoRatingHalve.vue{10}
:::

::::

<!-- 👉 No Hover Hint -->
::::card No hover hint

You can use `no-hover-hint` prop to disable visual changes of value before click.

:::code DemoRatingNoHoverHint
<<< @/components/demos/rating/DemoRatingNoHoverHint.vue{11}
:::

::::

<!-- 👉 Length -->
::::card Length

You can use `length` prop to change the amount of items.

:::code DemoRatingLength
<<< @/components/demos/rating/DemoRatingLength.vue{11}
:::

::::

<!-- 👉 Animate -->
:::::card Animate

Use `animate` prop to animate hovered rating icon.

::::code DemoRatingAnimate
<<< @/components/demos/rating/DemoRatingAnimate.vue{10}
::::

::::after-demo
:::tip
You can use `no-hover-hint` prop along with `animate` prop to only animate and prevent filling the rating icon on hover.
:::
::::

:::::

<!-- 👉 States -->
:::::card States

`ARating` also supports readonly & disabled states.

When rating is readonly or disabled, rating won't animate and you won't get hover hint. This means, when you set rating in readonly or disabled state, you are implicitly setting `:animate="false"` & `:no-hover-hint="true"`.

::::code DemoRatingStates
<<< @/components/demos/rating/DemoRatingStates.vue{10,14}
::::

::::after-demo
:::info NOTE
When rating is readonly or disabled, `a-rating-animated` class won't apply.
:::
::::

:::::

<!-- 👉 API -->
## API

<Api title="Rating" :api="api"></Api>
