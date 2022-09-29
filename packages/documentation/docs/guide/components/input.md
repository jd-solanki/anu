# Input

<!-- 👉 Basic -->
::::card Basic

You can use `AInput` component to render basic input.

:::code DemoInputBasic
<<< @/demos/input/DemoInputBasic.vue
:::

::::

<!-- 👉 Placeholder -->
::::card Placeholder

You can use `placeholder` attribute to add placeholder to the input.

:::code DemoInputPlaceholder
<<< @/demos/input/DemoInputPlaceholder.vue
:::

::::

<!-- 👉 Label -->
::::card Label

You can use `label` prop to add label to the input.

For maximum flexibility you can use `label` slot.

:::code DemoInputLabel
<<< @/demos/input/DemoInputLabel.vue{11,16}
:::

::::

:::warning
When you use **label slot**, Note that label's `for` attribute needs to prefix the `a-input-` when binding it to input's `id` attribute.
:::

<!-- 👉 Hint -->
::::card Hint

You can use `hint` prop to add hint to the input.

:::code <
<<< @/demos/input/DemoInputHint.vue
:::

::::

<!-- 👉 Icons -->
::::card Icons

You can use various icon location prop to add icon to the input.

:::code DemoInputIcons
<<< @/demos/input/DemoInputIcons.vue
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

You can use font-size utility to adjust the size of input.

:::code DemoInputSizing
<<< @/demos/input/DemoInputSizing.vue
:::

::::

:::tip
Like `AInput`, `ASelect` & `ATextarea` also built on top of `ABaseInput` base component. Hence, This demo also applies to `ASelect` & `ATextarea`.
:::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust input roundness by providing border-radius utilities to `input-wrapper-classes` prop.

:::code DemoInputRoundness
<<< @/demos/input/DemoInputRoundness.vue
:::

::::

:::tip
Like `AInput`, `ASelect` & `ATextarea` also built on top of `ABaseInput` base component. Hence, This demo also applies to `ASelect` & `ATextarea`.
:::

<!-- 👉 Types -->
::::card Types

You can use `type` attribute to add input type.

:::code DemoInputTypes
<<< @/demos/input/DemoInputTypes.vue
:::

::::

<!-- 👉 States -->
::::card States

You can use `readonly` prop to make input read only.

Use `disabled` prop to make input disabled.

:::code DemoInputStates
<<< @/demos/input/DemoInputStates.vue
:::

::::

<!-- 👉 Validation -->
::::card Validation

Anu do not provide any validation mechanism at the moment as it assume it's better handled by third-party libraries like [VeeValidate](https://vee-validate.logaretm.com/)

:::code DemoInputValidation
<<< @/demos/input/DemoInputValidation.vue
:::

::::
