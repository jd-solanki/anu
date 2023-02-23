<script lang="ts" setup>
import api from '@anu/component-meta/AAlert.json';
</script>

# Alert

<!-- 👉 Light -->
::::card Light

`light` is default variant for alert.

Use `color` prop to change the alert color.

:::code DemoAlertLight
<<< @/components/demos/alert/DemoAlertLight.vue{7,11,15,19}
:::

::::

<!-- 👉 Filled -->
::::card Filled

You can use `variant="fill"` to create alert with filled background.

:::code DemoAlertFilled
<<< @/components/demos/alert/DemoAlertFilled.vue{3,8,15,22,29}
:::

::::

<!-- 👉 Outlined -->
::::card Outlined

You can use `variant="outline"` to create outlined alert.

:::code DemoAlertOutlined
<<< @/components/demos/alert/DemoAlertOutlined.vue{3,9,16,23,30}
:::

::::

<!-- 👉 Icons -->
::::card Icons

You can use `icon` prop to render icon in alert.

Use `append-icon` prop to render icon after default slot.

:::code DemoAlertIcons
<<< @/components/demos/alert/DemoAlertIcons.vue{3,10,18}
:::

::::

<!-- 👉 Dismissible -->
::::card Dismissible

Use `dismissible` prop to create dismissible alert.

You can customize close icon using `append-icon` prop.

:::code DemoAlertDismissible
<<< @/components/demos/alert/DemoAlertDismissible.vue{3,8,16}
:::

::::

<!-- 👉 v-model support -->
::::card v-model support

Alert also supports `v-model` to show and hide alert based on model value.

:::code DemoAlertVModelSupport
<<< @/components/demos/alert/DemoAlertVModelSupport.vue{4,9}
:::

::::

<!-- 👉 API -->
## API

<Api :api="api" title="Alert"></Api>
