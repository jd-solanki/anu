<script lang="ts" setup>
import { ref } from 'vue'

const arc = ref(10)
const origin = ref(0)
const distance = ref(100)

const radius = 100
const pad = 20
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid-row sm:grid-cols-3 place-items-stretch">
      <AInput
        v-model="arc"
        type="number"
        label="Arc"
        hint="Value in %"
      />
      <AInput
        v-model="origin"
        type="number"
        label="Origin"
        hint="Value in %"
      />
      <AInput
        v-model="distance"
        type="number"
        label="Distance"
        hint="Value in %"
      />
    </div>

    <div class="flex gap-6">
      <ACircle
        :value="{
          value: arc,
          origin,
          distance,
          startDistance: radius - distance,
          endDistance: radius - distance,
          class: 'stroke-primary stroke-2',
          color: 'current',
          debug: true,
        }"
        class="mx-auto"
        svg-classes="w-300px h-300px"
        ring-classes="stroke-1"
      >
        <template #default="{ circles }">
          <!-- 👉 Axis -->
          <line
            :x1="-radius - pad"
            :x2="radius + pad"
            class="stroke-dark dark:stroke-light stroke-0.1"
          />
          <line
            :y1="radius + pad"
            :y2="-radius - pad"
            class="stroke-dark dark:stroke-light stroke-0.1"
          />

          <template
            v-for="(circle, i) in circles"
            :key="i"
          >
            <!-- 👉 Handles -->
            <circle
              class="fill-primary"
              :cx="circle.startX"
              :cy="circle.startY"
              r="4"
            />
            <circle
              class="fill-primary"
              :cx="circle.endX"
              :cy="circle.endY"
              r="4"
            />

            <!-- 👉 Sides -->
            <line
              :x2="circle.startX"
              :y2="circle.startY"
              :class="`stroke-${circle.color} stroke-1`"
            />
            <line
              :x2="circle.endX"
              :y2="circle.endY"
              :class="`stroke-${circle.color} stroke-1`"
            />

            <!-- 👉 Dashed lines -->
            <line
              :x1="circle.endX"
              :x2="circle.endX"
              :y2="circle.endY"
              :class="`stroke-${circle.color} stroke-0.5`"
              stroke-dasharray="4,4"
            />
            <line
              :y1="circle.endY"
              :x2="circle.endX"
              :y2="circle.endY"
              :class="`stroke-${circle.color} stroke-0.5`"
              stroke-dasharray="4,4"
            />

            <!-- 👉 X and Y values -->
            <text
              :x="circle.endX"
              :y="circle.endY > 0 ? -10 : 10"
              fill="currentColor"
              class="text-xs text-center"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {{ Math.round(circle.endX) }}
            </text>
            <text
              :x="circle.endX > 0 ? -10 : 10"
              :y="circle.endY"
              fill="currentColor"
              class="text-xs text-center"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {{ Math.round(-circle.endY) }}
            </text>
          </template>
        </template>
      </ACircle>
    </div>
  </div>
</template>
