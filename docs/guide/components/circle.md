<script lang="ts" setup>
import api from '@anu/component-meta/ACircle.json'
</script>

# Circle

<!-- 👉 Basic -->
::::card Basic

Use `ACircle` component to create svg circles.  

:::code DemoCircleBasic
<<< @/components/demos/circle/DemoCircleBasic.vue{1,2}
:::

::::

<!-- 👉 Knob -->
::::card Knob

Some custom spinners.

:::code DemoCircleKnob
<<< @/components/demos/circle/DemoCircleKnob.vue{1,2}
:::

::::

<!-- 👉 Spinners -->
::::card Spinners

Some custom spinners.

:::code DemoCircleSpinners
<<< @/components/demos/circle/DemoCircleSpinners.vue{1,2}
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
