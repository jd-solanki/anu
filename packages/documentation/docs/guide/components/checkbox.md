<script lang="ts" setup>
import api from '@anu-vue/component-meta/ACheckbox.json'
</script>

# Checkbox

<!-- 👉 Basic -->
::::card Basic

:::code DemoCheckboxBasic
<<< @/demos/checkbox/DemoCheckboxBasic.vue{4,9-11}
:::

::::

<!-- 👉 Icon -->
::::card Icon

Use `icon` prop to change the checked icon.

:::code DemoCheckboxIcon
<<< @/demos/checkbox/DemoCheckboxIcon.vue{3,7}
:::

::::

<!-- 👉 Array -->
::::card Array

`ACheckbox` also support arrays like a native checkbox.

:::code DemoCheckboxArray
<<< @/demos/checkbox/DemoCheckboxArray.vue{4,10,16,22,28}
:::

::::

<!-- 👉 Color -->
::::card Color

You can use `color` prop to change the checkbox color.

:::code DemoCheckboxColor
<<< @/demos/checkbox/DemoCheckboxColor.vue{4,11,18,25,32}
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
