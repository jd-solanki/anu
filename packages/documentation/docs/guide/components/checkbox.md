<script lang="ts" setup>
import api from '@anu-vue/component-meta/ACheckbox.json'
</script>

# Checkbox

<!-- 👉 Basic -->
::::card Basic

:::code DemoCheckboxBasic
<<< @/demos/checkbox/DemoCheckboxBasic.vue
:::

::::

<!-- 👉 Icon -->
::::card Icon

Use `icon` prop to change the checked icon.

:::code DemoCheckboxIcon
<<< @/demos/checkbox/DemoCheckboxIcon.vue
:::

::::

<!-- 👉 Array -->
::::card Array

`ACheckbox` also support arrays like a native checkbox.

:::code DemoCheckboxArray
<<< @/demos/checkbox/DemoCheckboxArray.vue
:::

::::

<!-- 👉 Color -->
::::card Color

You can use `color` prop to change the checkbox color.

:::code DemoCheckboxColor
<<< @/demos/checkbox/DemoCheckboxColor.vue
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
