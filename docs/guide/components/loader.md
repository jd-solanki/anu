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
:::::card Components {bordered}

Anu already integrated loading for components that requires loading.

::::code DemoLoaderComponents
<<< @/components/demos/loader/DemoLoaderComponents.vue{20-24,37-44,58-62,75-79,90,99,110,118}
::::

::::after-demo
:::tip Performance 🚀
If you don't use loading prop then `loading` prop for these component will be `undefined`. Anu will only render loader if `loading` prop is other than `undefined`. Hence, You won't get unwanted loader DOM if you aren't using loader.
:::
::::

:::::

<!-- 👉 Loader -->
:::::card Loader

You can use `ALoader` component to create customer loader/blocking UI.

You can customize overlay color and opacity via CSS vars `--a-loader-overlay-bg-c` & `--a-loader-overlay-bg-opacity` respectively.

::::code DemoLoaderLoader
<<< @/components/demos/loader/DemoLoaderLoader.vue{12,16}
::::

::::after-demo
:::info
As `ADrawer` & `ADialog` is built on top of `ACard`, you can pass `loading` prop to these components and loader will work without any extra efforts.
:::
::::

:::::

<!-- 👉 Spinner Icon -->
::::card Spinner Icon

Anu also provides convenient component `ALoadingIcon` for satisfying your custom needs 😇

:::code DemoLoaderSpinnerIcon
<<< @/components/demos/loader/DemoLoaderSpinnerIcon.vue
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

<Api title="Loader" :api="api"></Api>
