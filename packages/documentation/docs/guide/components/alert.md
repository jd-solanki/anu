# Alert

<!-- 👉 Light -->
<Demo>

## Light

`light` is default variant for alert.

<DemoAlertLight />

<template #code>

<<< @/demos/alert/DemoAlertLight.vue

</template>

</Demo>

<!-- 👉 Filled -->
<Demo>

## Filled

You can use `variant="fill"` to create alert with filled background.

<DemoAlertFilled />

<template #code>

<<< @/demos/alert/DemoAlertFilled.vue

</template>

</Demo>

<!-- 👉 Outlined -->
<Demo>

## Outlined

You can use `variant="outline"` to create outlined alert.

<DemoAlertOutlined />

<template #code>

<<< @/demos/alert/DemoAlertOutlined.vue

</template>

</Demo>

<!-- 👉 Icons -->
<Demo>

## Icons

You can use `icon` prop to render icon in button.

Use `append-icon` prop to render icon after default slot.

<DemoAlertIcons />

<template #code>

<<< @/demos/alert/DemoAlertIcons.vue

</template>

</Demo>

<!-- 👉 Dismissible -->
<Demo>

## Dismissible

Use `dismissible` prop to create dismissible alert.

You can customize close icon using `append-icon` prop.

<DemoAlertDismissible />

<template #code>

<<< @/demos/alert/DemoAlertDismissible.vue

</template>

</Demo>

<!-- 👉 v-model support -->
<Demo>

## v-model support

Alert also support `v-model` to show and hide alert based on model value.

<DemoAlertVModelSupport />

<template #code>

<<< @/demos/alert/DemoAlertVModelSupport.vue

</template>

</Demo>
