<script lang="ts" setup>
import api from '@anu-vue/component-meta/ADrawer.json'
</script>

# Drawer

<!-- 👉 Basic -->
::::card Basic

`ADrawer` component uses `ACard` as its base. Bind `ADrawer` with `v-model` to hide and show drawer/card.

All props & slots available in `ACard` is available in `ADrawer`.

:::code DemoDrawerBasic
<<< @/demos/drawer/DemoDrawerBasic.vue{8-12}
:::

::::

<!-- 👉 Anchor -->
::::card Anchor

You can change the position of the drawer by providing the values `left` or `right` to the `anchor` prop.

:::code DemoDrawerAnchor
<<< @/demos/drawer/DemoDrawerAnchor.vue{22,30}
:::

::::

<!-- 👉 Width -->
::::card Width

Use width utility classes to provide custom width to drawer. e.g. `w-[400px]`.

:::code DemoDrawerWidth
<<< @/demos/drawer/DemoDrawerWidth.vue{12}
:::

::::

<!-- 👉 Persistent -->
::::card Persistent

You can disable closing drawer on outside click via `persistent` prop.

:::code DemoDrawerPersistent
<<< @/demos/drawer/DemoDrawerPersistent.vue{13}
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
