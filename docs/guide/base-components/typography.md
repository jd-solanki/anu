<script lang="ts" setup>
import api from '@anu/component-meta/ATypography.json';
</script>

# Typography

<!-- 👉 Basic -->
::::card Basic

`ATypography` provides customizable typography for any needs.

This will completely change how you work with typography.

:::code DemoTypographyBasic
<<< @/components/demos/typography/DemoTypographyBasic.vue
:::

::::

<!-- 👉 Sizing -->
::::card Sizing

Want to create a list with title and subtitle no worries, Just add `text-sm`.

You can use other font-size utilities to change typography size.

:::code DemoTypographySizing
<<< @/components/demos/typography/DemoTypographySizing.vue{7,12,16,23,28,32,39,44,48}
:::

::::

<!-- 👉 Config Array -->
::::card Config Array

You can configure title, subtitle & text by passing array as prop instead of string.

First element of array will be treated as content and rest of them will be classes. You can create various layout using custom classes without writing same markup.

It greatly improves DX and keep you code a bit DRY.

:::code DemoTypographyConfigArray
<<< @/components/demos/typography/DemoTypographyConfigArray.vue{12-13,25-26,39-40,53-54}
:::

::::

<!-- 👉 API -->
## API

<Api :api="api"></Api>
