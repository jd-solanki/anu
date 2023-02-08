<script lang="ts" setup>
import api from '@anu/component-meta/ALoader.json';
</script>

# Loader

<!-- 👉 Spinner -->
::::card Spinner

Use `ASpinner` component to render a spinner. For adjusting size of the spinner you can use font size utilities or if you want to set it to fixed size then use width utilities `em:w-5`. Spinner have `aspect-square` so height will be matched.

:::code DemoLoaderSpinner
<<< @/components/demos/loader/DemoLoaderSpinner.vue{3,4}
:::

::::

<!-- 👉 Components -->
::::card Components

`ALoader` can be used in other components.

You can customize overlay color and opacity via CSS vars `--a-loader-overlay-bg-c` & `--a-loader-overlay-bg-opacity` respectively.

:::code DemoLoaderComponents
<<< @/components/demos/loader/DemoLoaderComponents.vue{20-24,37-44,58-62,75-79,90,99,110,118}
:::

::::

<!-- 👉 Overlay -->
::::card Overlay

Use the prop `overlay` to cover the parent component. You can change the apparence of the overlay with `bg-` and `bg-opacity-` unocss utilities.

:::code DemoLoaderOverlay
<<< @/components/demos/loader/DemoLoaderOverlay.vue{12,16}
:::

::::

<!-- 👉 Slot and Typography -->
::::card Slot and Typography

You can change the loader with the default slot.

Loader component uses `ATypography` component for its typography.

:::code DemoLoaderSlot
<<< @/components/demos/loader/DemoLoaderSlot.vue{5,6,8}
:::

::::

<!-- 👉 Full page -->
::::card Full page

You can display the loader component in a full page.

:::code DemoLoaderFullPage
<<< @/components/demos/loader/DemoLoaderFullPage.vue{14}
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
