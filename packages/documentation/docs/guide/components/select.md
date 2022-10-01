# Select

<!-- 👉 Basic -->
::::card Basic

You can use `ASelect` component to render basic select.

:::code DemoSelectBasic
<<< @/demos/select/DemoSelectBasic.vue{5-6,9-16,22-26,29-33}
:::

::::

<!-- 👉 Placeholder -->
::::card Placeholder

You can use `placeholder` attribute to add placeholder to the select.

:::code DemoSelectPlaceholder
<<< @/demos/select/DemoSelectPlaceholder.vue{13}
:::

::::

<!-- 👉 Label -->
::::card Label

You can use `label` prop to add label to the select.

:::code DemoSelectLabel
<<< @/demos/select/DemoSelectLabel.vue{13}
:::

::::

<!-- 👉 Hint -->
::::card Hint

You can use `hint` prop to add hint to the select.

:::code DemoSelectHint
<<< @/demos/select/DemoSelectHint.vue{13}
:::

::::

<!-- 👉 Icons -->
::::card Icons

You can use `append-inner-icon` prop to change icon of the select component.

To prepend the icon use `prepend-inner-icon` prop.

Moreover, you can also use `append-icon` & `prepend-icon` prop to add icon outside of the select component.

:::code DemoSelectIcons
<<< @/demos/select/DemoSelectIcons.vue{12,17}
:::

::::

<!-- 👉 Slots -->
::::card Slot

You can use default slot to render the `ASelect` options. Don't forget to bind `attrs` from [slotProps](https://vuejs.org/guide/components/slots.html#scoped-slots) to looping element.

:::code DemoSelectSlot
<<< @/demos/select/DemoSelectSlot.vue{18,21-30}
:::

::::

<!-- 👉 States -->
::::card States

You can use `readonly` prop to make select read only.

Use `disabled` prop to make select disabled.

:::code DemoSelectStates
<<< @/demos/select/DemoSelectStates.vue{12,18}
:::

::::
