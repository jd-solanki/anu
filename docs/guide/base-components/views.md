<script lang="ts" setup>
import viewApi from '@anu/component-meta/AView.json';
import viewsApi from '@anu/component-meta/AViews.json';
</script>

# Views

`AViews` is low level component that allows you render slider or carousel like functionality. It is used by `ATabs` component internally.

<!-- 👉 Basic -->
::::card Basic {bordered}

`AViews` component allows you to render single view from multiple views. It is useful when you want to render multiple views but only one view at a time.

This can be useful for tabs, carousels, etc.

:::code DemoViewsBasic
<<< @/components/demos/views/DemoViewsBasic.vue{29-51}
:::

::::

<!-- 👉 Carousel -->
::::card Carousel {bordered}

You can create carousel like functionality by using `AViews` component.

:::code DemoViewsCarousel
<<< @/components/demos/views/DemoViewsCarousel.vue{23-49}
:::

::::

<!-- 👉 API -->
## API

<Api title="Views" :api="viewsApi" class="mb-8"></Api>
<Api title="View" :api="viewApi"></Api>
