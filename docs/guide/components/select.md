<script lang="ts" setup>
import api from '@anu/component-meta/ASelect.json';
</script>

# Select

<!-- 👉 Basic -->
::::card Basic

You can use `ASelect` component to render basic select.

:::code DemoSelectBasic
<<< @/components/demos/select/DemoSelectBasic.vue
:::

::::

<!-- 👉 Placeholder -->
::::card Placeholder

You can use `placeholder` attribute to add placeholder to the select.

:::code DemoSelectPlaceholder
<<< @/components/demos/select/DemoSelectPlaceholder.vue{13}
:::

::::

<!-- 👉 Label -->
::::card Label

You can use `label` prop to add label to the select.

:::code DemoSelectLabel
<<< @/components/demos/select/DemoSelectLabel.vue{13}
:::

::::

<!-- 👉 Hint -->
::::card Hint

You can use `hint` prop to add hint to the select.

:::code DemoSelectHint
<<< @/components/demos/select/DemoSelectHint.vue{13}
:::

::::

<!-- 👉 Icons -->
::::card Icons

You can use `append-inner-icon` prop to change icon of the select component.

To prepend the icon use `prepend-inner-icon` prop.

Moreover, you can also use `append-icon` & `prepend-icon` prop to add icon outside of the select component.

:::code DemoSelectIcons
<<< @/components/demos/select/DemoSelectIcons.vue{12,17}
:::

::::

<!-- 👉 Slots -->
::::card Slots

You can use default slot to render the `ASelect` options.

:::code DemoSelectSlots
<<< @/components/demos/select/DemoSelectSlots.vue{19-29}
:::

::::

<!-- 👉 States -->
::::card States

You can use `readonly` prop to make select read only.

Use `disabled` prop to make select disabled.

:::code DemoSelectStates
<<< @/components/demos/select/DemoSelectStates.vue{12,18}
:::

::::

<!-- 👉 API -->
## API

<Api title="Select" :api="api"></Api>
