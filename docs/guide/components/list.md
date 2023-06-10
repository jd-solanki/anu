<script lang="ts" setup>
import api from '@anu/component-meta/AList.json';
import listItemApi from '@anu/component-meta/AListItem.json';
</script>

# List

<!-- 👉 Basic -->
:::::card Basic {bordered}

`AList` is fully customizable and provides easy to use API to render list. It support `ATypography` props to render text quickly.

You can also use `default` slot to render your custom content if you don't want to use typography props.

::::code DemoListBasic
<<< @/components/demos/list/DemoListBasic.vue{2-7,12}
::::

::::after-demo

:::tip Customization
`AList` is highly customizable component. It uses CSS variables for its spacing so you can have full control over high it look. You can update this CSS variables via UnoCSS classes to change the appearance.

```vue
<template>
  <AList class="[--a-list-gap:1rem]"></AList>
</template>
```

:::

:::warning
When you override the list item via CSS variable, it's up to you to handle `--a-spacing` CSS var. For example, you are overriding list gap and don't want to consider the `--a-spacing` variable then you can simply override it via `[--a-spacing:1]`. However, if you want to allow spacing modification then write `[--a-spacing:calc(1*var(--a-spacing))]`

For in library example you can check `.a-list-items-pill` class styles.
:::

:::details Make list items clickable
If you want to make list item clickable (have cursor pointer), You can pass `value` property other than `undefined`.

```ts{2}
const items = [
  { text: 'Donut jujubes', value: null }, // value other than `undefined`
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi' },
]
```

With above items, first item will be clickable (have cursor pointer) and rest of the items will have default pointer.

In case if you want to make all the items clickable without adding `value` property to each item, you can use `:model-value="null"` prop to `AList`.

```vue{13}
<script lang="ts" setup>
const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi' },
]
</script>

<template>
  <ACard>
    <AList
      :model-value="null"
      :items="items"
    />
  </ACard>
</template>
```

:::

::::

:::::

<!-- 👉 Slots -->
:::::card Slots {bordered}

Use `before` & `after` slot to add custom content before and after list items. There's also `prepend` & `append` slot for list item to append & prepend custom content.

::::code DemoListSlots
<<< @/components/demos/list/DemoListSlots.vue{17-20,22-26,29-35}
::::

::::after-demo
:::info
Default theme preset provides helpful class `.kbd` to render keyboard keys just like `kbd` element.
:::
::::

:::::

<!-- 👉 Avatar -->
:::::card Avatar {bordered}

You can also pass avatar props like `src` or `icon` to list item under `$avatar` property to render the desired avatar without writing extra markup.

You can also use `avatar-append` prop to render the avatar at the end instead of start.

::::code DemoListAvatar
<<< @/components/demos/list/DemoListAvatar.vue{7,13,19,25}
::::

::::after-demo
:::tip Taking flexibility to next level 🚀
`AList` supports rendering avatar & icon at the same time on desired location to improve the DX and reduce the markup.

If pass `$avatar` property and `icon` property at the same time, `icon` property will get precedence and `AList` will render icon.

Just like `avatar-append`, you can also use `icon-append` to render the action buttons for your list. <i class="i-fluent-emoji-smiling-face-with-sunglasses"></i>
:::
::::

:::::

<!-- 👉 `v-model` Support -->
:::::card `v-model` Support {bordered}

`AList` also support `v-model`. Use any value other than `undefined` to enable the `v-model` support.

If you are using `AListItem` in default slot of `AList` you can use `handleListItemClick` slot prop function to select the item value. `handleListItemClick` accepts option item as parameter.

::::code DemoListVModelSupport
<<< @/components/demos/list/DemoListVModelSupport.vue{11-12,20,34}
::::

::::after-demo
:::tip
For selection, `AList` uses [`useSelection`](/guide/composables/useSelection). Hence, you can also use the `multi` prop to allow multiple selection.
:::
::::

:::::

<!-- 👉 Variants -->
:::::card Variants {bordered}

`AList` also accepts layer props like `variant`, `color` & `states` to change the appearance of list.

::::code DemoListVariants
<<< @/components/demos/list/DemoListVariants.vue{19}
::::

::::after-demo
:::tip
Use `a-list-items-pill` to create pill shaped list items. It just modifies some CSS to achieve the pill UI.
:::
::::

:::::

:::card CSS Variables

`AList` comes with various CSS variables to customize the UI according to your need. You can check them in this [section](/guide/getting-started/customization.html#css-variables).

:::

<!-- 👉 API -->
## API

<Api title="List" :api="api" class="mb-8"></Api>
<Api title="List item" :api="listItemApi"></Api>
