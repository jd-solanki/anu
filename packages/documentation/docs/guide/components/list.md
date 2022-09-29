# List

<!-- 👉 Basic -->
::::card Basic

`AList` is fully customizable and provides easy to use API to render list. It support `ATypography` props to render text quickly.

You can also use `default` slot to render your custom content if you don't want to use typography props.

:::code DemoListBasic
<<< @/demos/list/DemoListBasic.vue{2-7,13}
:::

::::

<!-- 👉 Slots -->
::::card Slots

Use `before` & `after` slot to add custom content before and after list items. There's also `prepend` & `append` slot for list item to append & prepend custom content.

:::code DemoListSlots
<<< @/demos/list/DemoListSlots.vue{18-20,23-32,35-41}
:::

::::

<!-- 👉 Avatar -->
::::card Avatar

You can also pass avatar props like `icon` to list item as property to render the desired avatar without writing extra markup.

Moreover, to customize the avatar itself you can use `$avatar` property. E.g. Pass the `class` or another any prop/attribute.

:::code DemoListAvatar
<<< @/demos/list/DemoListAvatar.vue{4,7,10,13,16,19,22,25}
:::

::::

:::tip Taking flexibility to next level 🚀
For maximum flexibility, `AList` also provides `avatar-append` boolean prop to tell `AList` to render the avatar at the end instead of at start.
:::

<!-- 👉 `v-model` Support -->
::::card `v-model` Support

`AList` also support `v-model`. Use any value other than `null` to enable the `v-model` support.

If you don't provide `value` property to each list item, `AList` will emit list item's index as selected value.

:::code DemoListVModelSupport
<<< @/demos/list/DemoListVModelSupport.vue{11,18}
:::

::::

:::tip
For selection, `AList` uses [`useGroupModel`](/guide/composables/useGroupModel). Hence, you can also use the `multi` prop to allow multiple selection.
:::

<!-- 👉 Variants -->
::::card Variants

`AList` also accepts layer props like `variant`, `color` & `states` to change the appearance of list.

:::code DemoListVariants
<<< @/demos/list/DemoListVariants.vue{20}
:::

::::

:::tip
Use `a-list-items-pill` to create pill shaped list items. It just modifies some CSS to achieve the pill UI.
:::

## CSS Variables

`AList` comes with various CSS variables to customize the UI according to your need. You can check them in this [file](https://github.com/jd-solanki/anu/blob/main/packages/anu-vue/src/presets/theme-default/scss/index.scss).
