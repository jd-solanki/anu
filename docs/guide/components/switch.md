<script lang="ts" setup>
import api from '@anu/component-meta/ASwitch.json';
</script>

# Switch

<!-- 👉 Basic -->
::::card Basic

Use `ASwitch` component to create toggle for boolean value.

:::code DemoSwitchBasic
<<< @/components/demos/switch/DemoSwitchBasic.vue{4,8}
:::

::::

<!-- 👉 Colors -->
::::card Colors

You can use `color` prop to change the switch color.

:::code DemoSwitchColors
<<< @/components/demos/switch/DemoSwitchColors.vue{15,19,23,27,31}
:::

::::

<!-- 👉 Label -->
:::::card Label

You can use `label` prop to add label to switch component.

Label and switch have `justify-between` added as this is how generally used but you can use flex classes to modify it according to your use.

<br>

::::code DemoSwitchLabel
<<< @/components/demos/switch/DemoSwitchLabel.vue{13,17,21}
::::

::::after-demo
:::tip
You can also use default slot to render the label.
:::
::::

:::::

<!-- 👉 Icons -->
::::card Icons

Use `on-icon` & `off-icon` prop to render icons inside switch dot.

:::code DemoSwitchIcons
<<< @/components/demos/switch/DemoSwitchIcons.vue{15-16,20-21,26-27,32-33,38-39}
:::

::::

<!-- 👉 Array -->
::::card Array

Just like `ACheckbox`, `ASwitch` also supports array.

:::code DemoSwitchArray
<<< @/components/demos/switch/DemoSwitchArray.vue
:::

::::

<!-- Custom model values -->
::::card Custom model values

You can use `on-value` and `off-value` props to set custom `v-model` value.

:::code DemoSwitchCustomModelValue
<<< @/components/demos/switch/DemoSwitchCustomModelValue.vue{11-12}
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

You can use font-size utility to adjust the size of switch.

:::code DemoSwitchSizing
<<< @/components/demos/switch/DemoSwitchSizing.vue{16,20,25,29,33}
:::

::::

<!-- 👉 States -->
::::card States

You can use `disabled` prop to disable the switch.

:::code DemoSwitchStates
<<< @/components/demos/switch/DemoSwitchStates.vue{23,28}
:::

::::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust switch roundness using border-radius utilities.

:::code DemoSwitchRoundness
<<< @/components/demos/switch/DemoSwitchRoundness.vue{12,16}
:::

::::

<!-- 👉 API -->
## API

<Api title="Switch" :api="api"></Api>
