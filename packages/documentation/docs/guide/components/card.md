<script lang="ts" setup>
import api from '@anu-vue/component-meta/ACard.json'
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
<<< @/demos/card/DemoCardVariants.vue
:::

::::

<!-- 👉 Slot -->
::::card Slot

You can use `ATypography` slots to render custom content in header.

:::code DemoCardSlot
<<< @/demos/card/DemoCardSlot.vue
:::

::::

:::tip
Above demo adds content to the right of title. If you want to add content on the right of both title & subtitle use `headerRight` slot.
:::

## API

<Api :api="api"></Api>
