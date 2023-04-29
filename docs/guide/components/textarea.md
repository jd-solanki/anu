<script lang="ts" setup>
import api from '@anu/component-meta/ATextarea.json';
</script>

# Textarea

<!-- 👉 Basic -->
::::card Basic

You can use `ATextarea` component to render basic textarea.

:::code DemoTextareaBasic
<<< @/components/demos/textarea/DemoTextareaBasic.vue
:::

::::

<!-- 👉 Placeholder -->
::::card Placeholder

You can use `placeholder` attribute to add placeholder to the textarea.

:::code DemoTextareaPlaceholder
<<< @/components/demos/textarea/DemoTextareaPlaceholder.vue
:::

::::

<!-- 👉 Label -->
::::card Label

You can use `label` prop to add label to the textarea.

:::code DemoTextareaLabel
<<< @/components/demos/textarea/DemoTextareaLabel.vue
:::

::::

<!-- 👉 Height -->
::::card Height

You can adjust the height of ATextarea component by providing `height` prop with the value of valid height class. You have to prefix `!` to override the default height for using custom height.

:::code DemoTextareaHeight
<<< @/components/demos/textarea/DemoTextareaHeight.vue
:::

::::

<!-- 👉 Auto Size -->
::::card Auto Size

You can use `auto-size` prop to automatically update the height of ATextarea depending on the content.

:::code DemoTextareaAutoSize
<<< @/components/demos/textarea/DemoTextareaAutoSize.vue{3}
:::

::::

<!-- 👉 API -->
## API

<Api title="Textarea" :api="api"></Api>
