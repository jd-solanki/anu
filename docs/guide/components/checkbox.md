<script lang="ts" setup>
import api from '@anu/component-meta/ACheckbox.json';
</script>

# Checkbox

<!-- 👉 Basic -->
::::card Basic

:::code DemoCheckboxBasic
<<< @/components/demos/checkbox/DemoCheckboxBasic.vue{4,9-11}
:::

::::

<!-- 👉 Icon -->
::::card Icon

Use `icon` prop to change the checked icon.

:::code DemoCheckboxIcon
<<< @/components/demos/checkbox/DemoCheckboxIcon.vue{12,19}
:::

::::

<!-- 👉 Array -->
::::card Array

`ACheckbox` also support arrays like a native checkbox.

:::code DemoCheckboxArray
<<< @/components/demos/checkbox/DemoCheckboxArray.vue{4,10,16,22,28}
:::

::::

<!-- 👉 Color -->
::::card Color

You can use `color` prop to change the checkbox color.

:::code DemoCheckboxColor
<<< @/components/demos/checkbox/DemoCheckboxColor.vue{15,22,29,36,43}
:::

::::

<!-- 👉 Indeterminate -->
::::card Indeterminate

You can trigger indeterminate state of checkbox by setting `v-model` value to `null`. Moreover, you can also customize the indeterminate value by setting `indeterminate-value` prop.

By default, indeterminate value doesn't get cycled through the options. If you want to cycle through the options, you can set `cycle-indeterminate` prop to `true`.

:::code DemoCheckboxIndeterminate
<<< @/components/demos/checkbox/DemoCheckboxIndeterminate.vue{4,11}
:::

::::

<!-- 👉 API -->
## API

<Api title="Checkbox" :api="api"></Api>
