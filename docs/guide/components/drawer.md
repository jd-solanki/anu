<script lang="ts" setup>
import api from '@anu/component-meta/ADrawer.json';
</script>

# Drawer

<!-- 👉 Basic -->
::::card Basic

`ADrawer` component uses `ACard` as its base. Bind `ADrawer` with `v-model` to hide and show drawer/card.

All props & slots available in `ACard` is available in `ADrawer`.

:::code DemoDrawerBasic
<<< @/components/demos/drawer/DemoDrawerBasic.vue{8-12}
:::

::::

<!-- 👉 Anchor -->
::::card Anchor

You can change the position of the drawer by providing the values `left`,`right`,`top` or `bottom` to the `anchor` prop.

:::code DemoDrawerAnchor
<<< @/components/demos/drawer/DemoDrawerAnchor.vue{22,30}
:::

::::

<!-- 👉 Width -->
::::card Width

Use width utility classes to provide custom width to drawer. e.g. `!w-[400px]`.

:::code DemoDrawerWidth
<<< @/components/demos/drawer/DemoDrawerWidth.vue{12}
:::

::::

<!-- 👉 Persistent -->
::::card Persistent

You can disable closing drawer on outside click via `persistent` prop.

:::code DemoDrawerPersistent
<<< @/components/demos/drawer/DemoDrawerPersistent.vue{13}
:::

::::

<!-- 👉 API -->
## API

<Api title="Drawer" :api="api"></Api>
