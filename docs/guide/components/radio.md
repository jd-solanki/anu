<script lang="ts" setup>
import api from '@anu/component-meta/ARadio.json';
</script>

# Radio

<!-- 👉 Basic -->
::::card Basic

Use `label` prop to set the label.

:::code DemoRadioBasic
<<< @/components/demos/radio/DemoRadioBasic.vue{4,10,16,22,28}
:::

::::

<!-- 👉 Color -->
::::card Color

Use `color` prop to change the radio color.

:::code DemoRadioColor
<<< @/components/demos/radio/DemoRadioColor.vue{15}
:::

::::

<!-- 👉 API -->
## API

<Api title="Radio" :api="api"></Api>
