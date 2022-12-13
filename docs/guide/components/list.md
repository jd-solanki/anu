<script lang="ts" setup>
import api from '@anu/component-meta/AList.json';
</script>

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

You can also pass avatar props like `src` or `icon` to list item under `$avatar` property to render the desired avatar without writing extra markup.

You can also use `avatar-append` prop to render the avatar at the end instead of start.

:::code DemoListAvatar
<<< @/demos/list/DemoListAvatar.vue{7,13,19,25}
:::

::::

:::tip Taking flexibility to next level 🚀
`AList` supports rendering avatar & icon at the same time on desired location to improve the DX and reduce the markup.

If pass `$avatar` property and `icon` property at the same time, `icon` property will get precedence and `AList` will render icon.

Just like `avatar-append`, you can also use `icon-append` to render the action buttons for your list. <i class="i-fluent-emoji-smiling-face-with-sunglasses"></i>
:::

<!-- 👉 `v-model` Support -->
::::card `v-model` Support

`AList` also support `v-model`. Use any value other than `undefined` to enable the `v-model` support.

If you use `items` prop on `AList` and don't provide `value` property to each list item, `AList` will emit list item's index as selected value.

If you are using `AListItem` in default slot of `AList` you can use `handleListItemClick` slot prop function to select the item value. `handleListItemClick` accepts option item as parameter.

:::code DemoListVModelSupport
<<< @/demos/list/DemoListVModelSupport.vue{11-12,20,34}
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

`AList` comes with various CSS variables to customize the UI according to your need. You can check them in this [file](https://github.com/jd-solanki/anu/blob/main/packages/preset-theme-default/src/scss/index.scss).

<!-- 👉 API -->
## API

<Api :api="api"></Api>
