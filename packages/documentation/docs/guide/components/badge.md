# Badge

<!-- 👉 Default -->
<Demo>

## Default

Default variant for badge is `standard`

<DemoBadgeDefault />

<template #code>

<<< @/demos/badge/DemoBadgeDefault.vue

</template>

</Demo>

<!-- 👉 Color -->
<Demo>

## Content

Use the prop `badgeContent` to pass numeric values, if you want to use other data different than a number use the slot `badgeContent` instead

<DemoBadgeContent />

<template #code>

<<< @/demos/badge/DemoBadgeContent.vue

</template>

</Demo>

<!-- 👉 Content -->
<Demo>

## Color

You can use `color` prop to change the badge color.

<DemoBadgeColor />

<template #code>

<<< @/demos/badge/DemoBadgeColor.vue

</template>

</Demo>

<!-- 👉 Dot -->
<Demo>

## Dot

Use the prop `variant` to transform the badge into a `dot`

<DemoBadgeDot />

<template #code>

<<< @/demos/badge/DemoBadgeDot.vue

</template>

</Demo>

<!-- 👉 Anchor origin -->
<Demo>

## Anchor origin

Change the position of the badge by passing `horizontal` and `vertical` values to the `anchor` prop.

<DemoBadgeAnchor />

<template #code>

<<< @/demos/badge/DemoBadgeAnchor.vue

</template>

</Demo>

<!-- 👉 Max -->
<Demo>

## Max

Change the `max` prop to cap the numeric value of the content

<DemoBadgeMax />

<template #code>

<<< @/demos/badge/DemoBadgeMax.vue

</template>

</Demo>

<!-- 👉 Overlap -->
<Demo>

## Overlap

Use `overlap` prop to adjust the position of the badge, if you need more refined adjustments you can use the `offsetX` or `offsetY` props.

By default of `overlap` prop is `true`.

<DemoBadgeOverlap />

<template #code>

<<< @/demos/badge/DemoBadgeOverlap.vue

</template>

</Demo>
