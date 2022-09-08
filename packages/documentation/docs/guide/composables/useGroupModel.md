# useGroupModel

<!-- 👉 Basic -->
<Demo>

## Basic

`useGroupModel` allows you to create `v-model` like binding for a group.

You can use `multi` property to enable selecting multiple values from options.

<DemoUseGroupModelBasic />

<template #code>

<<< @/demos/composables/useGroupModel/DemoUseGroupModelBasic.vue{6-9}

</template>

</Demo>

<!-- 👉 Indexed -->
<Demo>

## Indexed

You can also create options without predefined value. Pass any positive number to `options` property and it will create index based options.

<DemoUseGroupModelIndexed />

<template #code>

<<< @/demos/composables/useGroupModel/DemoUseGroupModelIndexed.vue{4}

</template>

</Demo>

<!-- 👉 Object -->
<Demo>

## Object

description

<DemoUseGroupModelObject />

<template #code>

<<< @/demos/composables/useGroupModel/DemoUseGroupModelObject.vue{4-11}

</template>

</Demo>
