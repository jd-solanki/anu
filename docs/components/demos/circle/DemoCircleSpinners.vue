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

const colors = ['primary', 'success', 'warning', 'info', 'danger']
</script>

<template>
  <div
    class="hidden scale-90 scale-80 scale-70 scale-60 scale-50 scale-40 scale-30 scale-20 scale-10
    rotate-90 rotate-80 rotate-70 rotate-60 rotate-50 rotate-40 rotate-30 rotate-20 rotate-10
   animate-delay-100 animate-delay-200 animate-delay-300 animate-delay-400 animate-delay-500 animate-delay-600 animate-delay-700 animate-delay-800 animate-delay-900 animate-delay-1000"
  />

  <div class="flex justify-between">
    <ACircle
      :value="35"
      color="primary"
      class="text-6xl animate-spin"
    />

    <ACircle
      :value="[{ value: 20 }, { value: 40, class: 'opacity-50 animate-spin', r: 20 }]"
      color="success"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="hidden"
      :is-percent="false"
    />

    <ACircle
      :value="[{ value: 25, class: 'stroke-cap-round stroke-20' }]"
      color="info"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="stroke-6"
    />

    <ACircle
      :value="[{ class: 'stroke-20 stroke-cap-round animate-circular-dash' }]"
      color="danger"
      class="text-6xl animate-spin"
      ring-classes="hidden"
    />
    <ACircle
      :value="[{ class: `stroke-6 stroke-info animate-circular-dash` }]"
      class="text-6xl animate-spin animate-duration-2000"
      svg-classes="animate-spin animate-duration-3000"
      ring-classes="stroke-none"
      rounded
    >
      <template #default="{ arcs, total }">
        <circle
          class="fill-info"
          :cx="arcs[0].endX"
          :cy="arcs[0].endY"
          r="20"
        />
      </template>
    </ACircle>

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-65 stroke-${color} animate-swing animate-count-infinite animate-delay-${index * 200}` },
        { value: 500, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000 children:children:children:scale-90"
      ring-classes="hidden"
      rounded
      :is-percent="false"
    />
  </div>

  <div class="flex justify-between mt-8">
    <ACircle
      :value="colors.map((color, index) => ([
        { class: `stroke-10 stroke-${color} animate-circular-dash stroke-cap-round animate-delay-${(index + 1) * 200}` }, //, r: (index + 1) * 8 },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="stroke-none"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { class: `stroke-10 stroke-${color} animate-circular-dash scale-${100 - index * 10} animate-delay-${(index + 1) * 200}` }, //, r: (index + 1) * 8 },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="stroke-none"
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

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-none`, color },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000"
      ring-classes="stroke-none"
    >
      <template #default="{ arcs }">
        <circle
          v-for="(item, index) in arcs"
          :key="index"
          :class="`stroke-${item.color} fill-${item.color} animate-spin animate-duration-4000`"
          :cx="item.startX"
          :cy="item.startY"
          r="10"
        />
        <circle
          v-for="(item, index) in arcs"
          :key="index"
          :class="`stroke-${item.color} fill-${item.color} scale-40`"
          :cx="item.endX"
          :cy="item.endY"
          r="15"
        />
      </template>
    </ACircle>

    <ACircle
      :value="colors.map((color, index) => ([{ value: 20, class: `stroke-none`, color }])).flat()"
      class="text-6xl animate-spinn"
      ring-classes="stroke-none"
    >
      <template #default="{ arcs, total }">
        <g
          v-for="n in 3"
          :key="n"
          :class="`animate-spin animate-duration-${1000 * n}`"
        >
          <circle
            v-for="(item, index) in arcs"
            :key="index"
            :class="`stroke-${item.color} stroke-5 scale-${30 + (n * n - 1) * 10}`"
            :cx="item.startX"
            :cy="item.startY"
            :r="6"
          />
        </g>
      </template>
    </ACircle>

    <ACircle
      :value="colors.map((color, index) => ([{ value: 20, class: `stroke-none`, color }])).flat()"
      class="text-6xl animate-spinn animate-duration-2000"
      ring-classes="stroke-none"
      svg-classes="rounded-full"
    >
      <template #default="{ arcs, total }">
        <g
          v-for="n in 2"
          :key="n"
          :class="`animate-spinn animate-duration-${1000 * n}`"
        >
          <circle
            v-for="(item, index) in arcs"
            :key="index"
            :class="`stroke-${item.color} stroke-3 rotate-${30 + (n * n - 1) * 10}`"
            :cx="item.startX"
            :cy="item.startY"
            :r="3"
          >
            <animate
              attributeName="r"
              begin="0s"
              dur="1s"
              repeatCount="indefinite"
              :from="`${1 * index}%`"
              :to="`${20 * index}%`"
            />
            <animate
              attributeName="cx"
              begin="0s"
              dur="1s"
              repeatCount="indefinite"
              :from="`${1 * n}%`"
              :to="`${25 * n}%`"
            />
            <animate
              attributeName="cy"
              begin="0s"
              dur="1s"
              repeatCount="indefinite"
              :from="`${1 * n}%`"
              :to="`${25 * n}%`"
            />
          </circle>
        </g>
      </template>
    </ACircle>

    <ACircle
      :value="colors.map((color, index) => ([{ value: 20, class: `stroke-none`, color }])).flat()"
      class="text-6xl animate-spinn animate-duration-2000"
      ring-classes="stroke-none"
      svg-classes="rounded-full"
    >
      <template #default="{ arcs, total }">
        <circle
          v-for="(item, index) in arcs"
          :key="index"
          :class="`stroke-${item.color} stroke-3`"
        >
          <animate
            attributeName="r"
            begin="0s"
            dur="2s"
            repeatCount="indefinite"
            :from="`${0 * (index + 1)}%`"
            :to="`${10 * (index + 1)}%`"
          />
        </circle>
      </template>
    </ACircle>
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
      type="pie"
    />

    <ACircle
      :value="[].concat(...Array(2).fill(colors.map((color, index) => ({
        value: 10,
        class: `stroke-full stroke-${color} blur animate-spin animate-duration-3000`,
      }))))"
      class="text-6xl"
      svg-classes="rounded-full"
      ring-classes="hidden"
    />

    <ACircle
      :value="[].concat(...Array(2).fill(colors.map((color, index) => ({
        value: 10,
        class: `stroke-full stroke-${color} blur animate-spin animate-duration-2000`,
      }))))"
      class="text-6xl"
      svg-classes="rounded-full"
      ring-classes="hidden"
      viewBox="0,0,200,200"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-36 stroke-${color} animate-bounce-alt animate-count-infinite` },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-2000"
      svg-classes="rounded-full"
      ring-classes="hidden"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-full stroke-${color} animate-rubber-band animate-count-infinite animate-duration-2000` },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-5000"
      ring-classes="hidden"
      type="pie"
    />

    <ACircle
      :value="colors.map((color, index) => ([
        { value: 10, class: `stroke-36 stroke-${color} animate-ping animate-count-infinite animate-delay-${(index + 1) * 200}` },
        { value: 10, class: 'hidden' },
      ])).flat()"
      class="text-6xl animate-spin animate-duration-5000"
      type="pie"
      ring-classes="hidden"
    />
  </div>
</template>
