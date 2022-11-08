<script lang="ts" setup>
import api from '@anu-vue/component-meta/AChip.json';
</script>

# Chip

<!-- 👉 Light -->
::::card Light

`light` is default variant for chip.

Use `color` prop to change the button color.

:::code DemoChipLight
<<< @/demos/chip/DemoChipLight.vue{4,7,10,13}
:::

::::

<!-- 👉 Variants -->
::::card Variants

You can use `variant` prop to change the chip variant.

:::code DemoChipVariants
<<< @/demos/chip/DemoChipVariants.vue{2,8,16}
:::

::::

<!-- 👉 Roundness -->
::::card Roundness

You can adjust chip roundness using border-radius utilities.

:::code DemoChipRoundness
<<< @/demos/chip/DemoChipRoundness.vue{4,11,18,25}
:::

::::

<!-- 👉 Closable -->
::::card Closable

You can use `closable` to be able to close the chip.

:::code DemoChipClosable
<<< @/demos/chip/DemoChipClosable.vue{4-10,21}
:::

::::

<!-- 👉 Icon -->
::::card Icon

You can use `icon` prop to render icon in chip.

Use `append-icon` prop to render icon after default slot.

:::code DemoChipIcon
<<< @/demos/chip/DemoChipIcon.vue{3,8,14,20,26}
:::

::::

<!-- 👉 Click Action -->
::::card Click Action

Chip can be used as action item. You can use `@click` directive to handle onClick event.

:::code DemoChipOnClick
<<< @/demos/chip/DemoChipOnClick.vue{13}
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
