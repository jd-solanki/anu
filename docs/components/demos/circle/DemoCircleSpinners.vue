<script lang="ts" setup>
import { TransitionPresets, useIntervalFn, useTransition } from '@vueuse/core'

import { ref } from 'vue'

const baseNumber = ref(10)

const number = useTransition(baseNumber, {
  duration: 1000,
  transition: TransitionPresets.easeOutExpo,
})
useIntervalFn(() => {
  baseNumber.value = baseNumber.value >= 10 ? 0 : 10
}, 1000)

const colors = ['primary', 'info', 'success', 'warning', 'danger']
</script>

<template>
  <div class="flex justify-between">
    <ACircle
      :value="35"
      color="primary"
      class="text-6xl animate-spin"
    />

    <ACircle
      :value="[{ value: 35, class: 'stroke-current' }]"
      color="info"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="stroke-6"
      rounded
    />

    <ACircle
      :value="[{ value: 35, class: 'stroke-current' }, { value: 80, class: 'stroke-current opacity-50 animate-spin animate-count-infinite' }]"
      color="success"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="hidden"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-36 stroke-${color} animate-swing animate-count-infinite ` },
        { value: 1000, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000 children:children:children:scale-80"
      ring-classes="hidden"
      rounded
      :is-percent="false"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: number, class: `stroke-8 stroke-${color}` },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="stroke-none"
      rounded
    />
  </div>

  <div class="flex justify-between mt-8">
    <ACircle
      :value="colors.map((color, index) => ({
        value: 20,
        class: `stroke-full stroke-${color} animate-spin animate-count-infinite animate-duration-2000`,
      }))"
      class="text-6xl animate-spin animate-duration-4000"
      svg-classes="rounded-xl"
      ring-classes="hidden"
    />

    <ACircle
      :value="[].concat(...Array(2).fill(colors.map((color, index) => ({
        value: 10,
        class: `stroke-full stroke-${color} blur animate-spin animate-duration-3000`,
      }))))"
      class="text-6xl"
      ring-classes="hidden"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-36 stroke-${color} animate-bounce-alt animate-count-infinite animate-delay-${100 + index * 100}` },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="hidden"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-full stroke-${color} animate-rubber-band animate-count-infinite animate-duration-2000` },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-5000"
      ring-classes="hidden"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-36 stroke-${color} animate-ping animate-count-infinite animate-delay-${100 + index * 100}` },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-5000"
      ring-classes="hidden"
    />
  </div>
</template>
