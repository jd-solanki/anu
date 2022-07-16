# Typography

<!-- TODO: Replace ABtn with AAvatar when ready. -->

<!-- 👉 Basic -->
<Demo>

## Basic

`ATypography` provides customizable typography for any needs.

This will completely change how you work with typography.

<DemoTypographyBasic />

<template #code>

<<< @/demos/typography/DemoTypographyBasic.vue

</template>

</Demo>

<!-- 👉 Sizing -->
<Demo>

## Sizing

Want to create a list with title and subtitle no worries, Just add `text-sm`.

You can use other font-size utilities to change typography size.

<DemoTypographySizing />

<template #code>

<<< @/demos/typography/DemoTypographySizing.vue

</template>

</Demo>

<!-- 👉 Config Array -->
<Demo>

## Config Array

You can configure title, subtitle & text by passing array as prop instead of string.

First element of array will be treated as content and rest of them will be classes. You can create various layout using custom classes without writing same markup.

It greatly improves DX and keep you code a bit DRY.

<DemoTypographyConfigArray />

<template #code>

<<< @/demos/typography/DemoTypographyConfigArray.vue

</template>

</Demo>
