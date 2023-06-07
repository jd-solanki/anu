<script lang="ts" setup>
import tabApi from '@anu/component-meta/ATab.json';
import tabsApi from '@anu/component-meta/ATabs.json';
</script>

# Tabs

<!-- 👉 Basic -->
:::::card Basic

You can render the tabs component by using the `ATabs` component.

You can use `tabs` prop to pass the tabs data. The `tabs` prop is an array of strings or objects. Each object should have `title` property to render tab title.

::::code DemoTabsBasic
<<< @/components/demos/tabs/DemoTabsBasic.vue
::::

::::after-demo

:::tip `.a-tabs-bordered` class
Tabs component doesn't have the border bottom by default. If you want to add the border bottom, you can add the `.a-tabs-bordered` class to the `ATabs` component.
:::

::::

:::::

<!-- 👉 Icons -->
:::::card Icons

You can use `icon` property to render the icon with the tab title.

Additionally, you can also use `stacked-tabs` boolean prop to stack the tabs vertically.

::::code DemoTabsIcons
<<< @/components/demos/tabs/DemoTabsIcons.vue{13-18,38}
::::

::::after-demo
:::tip
Use icon only tabs in mobile devices for better user experience.
:::
::::

:::::

<!-- 👉 `v-model` Support -->
::::card `v-model` Support

You can use `v-model` to bind the value of the selected tab.

:::code DemoTabsVModelSupport
<<< @/components/demos/tabs/DemoTabsVModelSupport.vue{15}
:::

::::

<!-- 👉 Vertical -->
::::card Vertical

Use `vertical` prop to render the vertical tabs.

:::code DemoTabsVertical
<<< @/components/demos/tabs/DemoTabsVertical.vue{13}
:::

::::

<!-- 👉 Arrows -->
:::::card Arrows

If you have more tabs than the available space, `ATabs` will automatically add the arrows to navigate between tabs.

If you noticed from below example, Anu added [scroll snapping](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap/Basic_concepts) features to tab navigation so the tabs will snap to the nearest tab when you scroll via arrows.

::::code DemoTabsArrows
<<< @/components/demos/tabs/DemoTabsArrows.vue
::::

::::after-demo
:::tip Great UX
As scroll snapping is enabled, users will no longer have to fight with the scroll to avoid cutting off the tab title.

Anu might be the first UI library to implement scroll snapping in tabs. <i class="i-fluent-emoji-sparkles"></i>
:::
::::

:::::

<!-- 👉 With Views -->
:::::card With Views

`ATabs` uses `AViews` component under the hood to render the tab content. Use dynamically created slots to render the tab content.

If you are passing array of strings to the `tabs` prop, you can use that string as the slot name to render the tab content. e.g. `<template #title>`

If you are passing array of object that doesn't has `value` property to the `tabs` prop, you can use index as the slot name to render the tab content. e.g. `<template #1>`

::::code DemoTabsWithViews
<<< @/components/demos/tabs/DemoTabsWithViews.vue{24-49}
::::

::::after-demo
:::tip DX Improved 🚀
Comparing other frameworks, You don't have to write a separate component for each tab. You can just use dynamic slot to render the tab content.
:::

:::details Dynamic Transition
If you don't specify any transition `ATabs` component will assign dynamic transition based on visited tab. For example, if you visit any tab next to the active tab, `view-next` transition will trigger or else `view-previous`.

If you want to use custom transition, you can use `transition` prop to override the dynamic transition.
:::
::::

:::::

<!-- 👉 Dynamic Tabs -->
<!-- ::::card Dynamic Tabs

description

:::code DemoTabsDynamicTabs
<<< @/components/demos/tabs/DemoTabsDynamicTabs.vue
:::

:::: -->

<!-- 👉 API -->
## API

<Api title="Tabs" :api="tabsApi" class="mb-8"></Api>
<Api title="Tab" :api="tabApi"></Api>
