<script lang="ts" setup>
import api from '@anu-vue/component-meta/ACard.json';
</script>

# Card

<!-- 👉 Basic -->
::::card Basic

Card component uses [`ATypography`](/guide/base-components/typography) component for its typography.

Moreover, you can also use `.card-body` in default slot to render card content.

You can use `.card-spacer` helper class to add margin bottom to each of its children except last.

:::code DemoCardBasic
<<< @/demos/card/DemoCardBasic.vue
:::

::::

:::details Card text font size
If you pass `text` prop directly on `ACard` then `ACard` will add `text-sm` class before passing down it to `ATypography`. Hence, when you don't use `text` prop and manually write text as show in second card, for small text you have to add `text-sm` class.

This way if you want 16px font for your card text instead of 14px you can omit adding `text-sm` to `p` tag;
:::

:::tip
You can customize the applied `margin-bottom` by configuring `--a-card-spacer` CSS variable.
:::

<!-- 👉 Various Elements -->
::::card Various Elements

Mix and match the different components to achieve desired UI.

:::code DemoCardVariousElements
<<< @/demos/card/DemoCardVariousElements.vue
:::

::::

<!-- 👉 Variants -->
::::card Variants

Card component uses layer composable as it's base. You can use `variant` prop to create various card variants.

:::code DemoCardVariants
<<< @/demos/card/DemoCardVariants.vue{8,17,27,37}
:::

::::

<!-- 👉 Slot -->
::::card Slot

You can use `ATypography` slots to render custom content in header.

:::code DemoCardSlot
<<< @/demos/card/DemoCardSlot.vue{8-17,25-34}
:::

::::

:::tip
Above demo adds content to the right of title. If you want to add content on the right of both title & subtitle use `headerRight` slot.
:::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
