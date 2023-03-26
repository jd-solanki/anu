<script lang="ts" setup>
import api from '@anu/component-meta/AInput.json';
</script>

# Input

<!-- 👉 Basic -->
::::card Basic

You can use `AInput` component to render basic input.

:::code DemoInputBasic
<<< @/components/demos/input/DemoInputBasic.vue{4}
:::

::::

<!-- 👉 Placeholder -->
::::card Placeholder

You can use `placeholder` attribute to add placeholder to the input.

:::code DemoInputPlaceholder
<<< @/components/demos/input/DemoInputPlaceholder.vue{6}
:::

::::

<!-- 👉 Label -->
:::::card Label

You can use `label` prop to add label to the input.

For maximum flexibility you can use `label` slot.

::::code DemoInputLabel
<<< @/components/demos/input/DemoInputLabel.vue{4,15-20}
::::

::::after-demo
:::warning
When you use **label slot**, Note that label's `for` attribute needs to prefix the `a-input-` when binding it to input's `id` attribute.
:::
::::

:::::

<!-- 👉 Hint -->
::::card Hint

You can use `hint` prop to add hint to the input.

:::code DemoInputHint
<<< @/components/demos/input/DemoInputHint.vue{7}
:::

::::

<!-- 👉 Icons -->
::::card Icons

You can use various icon location prop to add icon to the input.

:::code DemoInputIcons
<<< @/components/demos/input/DemoInputIcons.vue{7,14,22,29}
:::

::::

<!-- 👉 Sizing -->
:::::card Sizing

You can use font-size utility to adjust the size of input.

::::code DemoInputSizing
<<< @/components/demos/input/DemoInputSizing.vue{5,11,17,23,29}
::::

::::after-demo
:::tip
Like `AInput`, `ASelect` & `ATextarea` also built on top of `ABaseInput` base component. Hence, This demo also applies to `ASelect` & `ATextarea`.
:::
::::

:::::

<!-- 👉 Roundness -->
:::::card Roundness

You can adjust input roundness by providing border-radius utilities to `input-wrapper-classes` prop.

::::code DemoInputRoundness
<<< @/components/demos/input/DemoInputRoundness.vue{5,11,20,26}
::::

::::after-demo
:::tip
Like `AInput`, `ASelect` & `ATextarea` also built on top of `ABaseInput` base component. Hence, This demo also applies to `ASelect` & `ATextarea`.
:::
::::

:::::

<!-- 👉 Types -->
::::card Types

You can use `type` attribute to add input type.

:::code DemoInputTypes
<<< @/components/demos/input/DemoInputTypes.vue{4,8,12,16,20,24,28,32}
:::

::::

<!-- 👉 States -->
::::card States

You can use `readonly` prop to make input read only.

Use `disabled` prop to make input disabled.

:::code DemoInputStates
<<< @/components/demos/input/DemoInputStates.vue{10,15}
:::

::::

<!-- 👉 Validation -->
::::card Validation

Anu do not provide any validation mechanism at the moment as it assume it's better handled by third-party libraries like [VeeValidate](https://vee-validate.logaretm.com/)

:::code DemoInputValidation
<<< @/components/demos/input/DemoInputValidation.vue{2,6,13-14}
:::

::::

<!-- 👉 API -->
## API

<Api title="Input" :api="api"></Api>
