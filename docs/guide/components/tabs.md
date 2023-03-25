# Tabs

<!-- 👉 Basic -->
::::card Basic

You can render the tabs component by using the `ATabs` component.

You can use `tabs` prop to pass the tabs data. The `tabs` prop is an array of strings or objects. Each object should have `title` property to render tab title.

:::code DemoTabsBasic
<<< @/components/demos/tabs/DemoTabsBasic.vue
:::

::::

:::tip `.a-tabs-bordered` class
Tabs component doesn't have the border bottom by default. If you want to add the border bottom, you can add the `.a-tabs-bordered` class to the `ATabs` component.
:::

<!-- 👉 Icons -->
::::card Icons

You can use `icon` property to render the icon with the tab title.

Additionally, you can also use `stacked-tabs` boolean prop to stack the tabs vertically.

:::code DemoTabsIcons
<<< @/components/demos/tabs/DemoTabsIcons.vue
:::

::::

:::tip
Use icon only tabs in mobile devices for better user experience.
:::

<!-- 👉 `v-model` Support -->
::::card `v-model` Support

You can use `v-model` to bind the value of the selected tab.

:::code DemoTabsVModelSupport
<<< @/components/demos/tabs/DemoTabsVModelSupport.vue
:::

::::

<!-- 👉 Vertical -->
::::card Vertical

Use `vertical` prop to render the vertical tabs.

:::code DemoTabsVertical
<<< @/components/demos/tabs/DemoTabsVertical.vue
:::

::::

<!-- 👉 Arrows -->
::::card Arrows

description

:::code DemoTabsArrows
<<< @/components/demos/tabs/DemoTabsArrows.vue
:::

::::

<!-- 👉 With Views -->
::::card With Views

description

:::code DemoTabsWithViews
<<< @/components/demos/tabs/DemoTabsWithViews.vue{24-44}
:::

::::

<!-- 👉 Dynamic Tabs -->
<!-- ::::card Dynamic Tabs

description

:::code DemoTabsDynamicTabs
<<< @/components/demos/tabs/DemoTabsDynamicTabs.vue
:::

:::: -->
