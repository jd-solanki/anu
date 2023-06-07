<script lang="ts" setup>
import api from '@anu/component-meta/ACard.json';
</script>

# Card

<!-- 👉 Basic -->
:::::card Basic {bordered}

Card component uses [`ATypography`](/guide/base-components/typography) component for its typography.

Moreover, you can also use `.card-body` in default slot to render card content.

You can use `.card-spacer` helper class to add margin bottom to each of its children except last.

::::code DemoCardBasic
<<< @/components/demos/card/DemoCardBasic.vue
::::

::::after-demo

:::details Card text font size
If you pass `text` prop directly on `ACard` then `ACard` will add `text-sm` class before passing down it to `ATypography`. Hence, when you don't use `text` prop and manually write text as show in second card, for small text you have to add `text-sm` class.

This way if you want 16px font for your card text instead of 14px you can omit adding `text-sm` to `p` tag;
:::

:::tip Adjusting card body padding
You can adjust the padding to applied by `a-card-body` using `--a-card-padding` CSS variable.
:::

:::tip Adjusting card spacer margin
You can customize the applied `margin-bottom` by configuring `--a-card-spacer` CSS variable.
:::

::::

:::::

<!-- 👉 Various Elements -->
::::card Various Elements {bordered}

Mix and match the different components to achieve desired UI.

:::code DemoCardVariousElements
<<< @/components/demos/card/DemoCardVariousElements.vue
:::

::::

<!-- 👉 Variants -->
::::card Variants {bordered}

Card component uses layer composable as it's base. You can use `variant` prop to create various card variants.

:::code DemoCardVariants
<<< @/components/demos/card/DemoCardVariants.vue{8,17,27,37}
:::

::::

<!-- 👉 Slot -->
:::::card Slot {bordered}

You can use `ATypography` slots to render custom content in header.

::::code DemoCardSlot
<<< @/components/demos/card/DemoCardSlot.vue{8-17,25-34}
::::

::::after-demo
:::tip
Above demo adds content to the right of title. If you want to add content on the right of both title & subtitle use `header-right` slot.
:::
::::

:::::

<!-- 👉 API -->
## API

<Api title="Card" :api="api"></Api>
