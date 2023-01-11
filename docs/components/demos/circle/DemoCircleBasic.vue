<script lang="ts" setup>
import { ref } from 'vue'

const arcValue = ref(10)
const origin = ref(0)
const distance = ref(100)

const radius = 100
const pad = 20
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid-row sm:grid-cols-3 place-items-stretch">
      <AInput
        v-model="arcValue"
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
          value: arcValue,
          origin,
          distance,
          startDistance: radius - distance,
          endDistance: radius - distance,
          class: 'stroke-primary stroke-2',
          color: 'current',
        }"
        class="mx-auto"
        svg-classes="w-300px h-300px"
        ring-classes="stroke-1"
      >
        <template #default="{ arcs }">
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
            v-for="(arc, i) in arcs"
            :key="i"
          >
            <!-- 👉 Handles -->
            <circle
              class="fill-primary"
              :cx="arc.startX"
              :cy="arc.startY"
              r="5"
            />
            <circle
              class="fill-primary"
              :cx="arc.endX"
              :cy="arc.endY"
              r="5"
            />

            <!-- 👉 Sides -->
            <line
              :x2="arc.startX"
              :y2="arc.startY"
              :class="`stroke-${arc.color} stroke-1`"
            />
            <line
              :x2="arc.endX"
              :y2="arc.endY"
              :class="`stroke-${arc.color} stroke-1`"
            />

            <!-- 👉 Dashed lines -->
            <line
              :x1="arc.endX"
              :x2="arc.endX"
              :y2="arc.endY"
              :class="`stroke-${arc.color} stroke-0.5`"
              stroke-dasharray="4,4"
            />
            <line
              :y1="arc.endY"
              :x2="arc.endX"
              :y2="arc.endY"
              :class="`stroke-${arc.color} stroke-0.5`"
              stroke-dasharray="4,4"
            />

            <!-- 👉 X and Y values -->
            <text
              :x="arc.endX"
              :y="arc.endY > 0 ? -12 : 14"
              fill="currentColor"
              class="text-xs"
              dominant-baseline="middle"
              text-anchor="middle"
            >
              {{ Math.round(arc.endX) }}
            </text>
            <text
              :x="arc.endX > 0 ? -10 : 10"
              :y="arc.endY"
              fill="currentColor"
              class="text-xs"
              dominant-baseline="middle"
              :text-anchor="arc.endX > 0 ? 'end' : 'start'"
            >
              {{ Math.round(-arc.endY) }}
            </text>
          </template>
        </template>
      </ACircle>
    </div>
  </div>
</template>
