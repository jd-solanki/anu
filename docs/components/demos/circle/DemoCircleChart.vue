<script lang="ts" setup>
import { computed, ref } from 'vue'

const isPercent = ref(true)

const val1 = ref(20)
const val2 = ref(40)
const val3 = ref(10)
const values = computed(() => [
  { value: val1.value, class: 'stroke-primary', color: 'primary', startDistance: 20, endDistance: 10 },
  { value: val2.value, class: 'stroke-danger', color: 'danger', startDistance: 70, endDistance: 10 },
  { value: val3.value, class: 'stroke-success', color: 'success', startDistance: 20, endDistance: 10 },
])
const slices = computed(() => [
  { value: val1.value, class: 'stroke-primary stroke-full' },
  { value: val2.value, class: 'stroke-danger stroke-full' },
  { value: val3.value, class: 'stroke-success stroke-20' },
])
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="grid-row sm:grid-cols-3 place-items-stretch">
      <AInput
        v-model="val1"
        type="number"
      />
      <AInput
        v-model="val2"
        type="number"
      />
      <AInput
        v-model="val3"
        type="number"
      />
      <ACheckbox v-model="isPercent">
        It's percentages
      </ACheckbox>
    </div>

    <div class="flex gap-6">
      <ACircle
        :value="values"
        :is-percent="isPercent"
        svg-classes="w-100px h-100px"
      />

      <ACircle
        :value="values"
        :is-percent="isPercent"
        class="text-8xl"
        rounded
      >
        <template #default="{ arcs }">
          <circle
            v-for="(dot, i) in arcs"
            :key="i"
            :class="`fill-${dot.color} stroke-white`"
            :cx="dot.startX"
            :cy="dot.startY"
            r="8"
          />
          <circle
            v-for="(dot, i) in arcs"
            :key="i"
            :class="`fill-${dot.color} stroke-black`"
            :cx="dot.endX"
            :cy="dot.endY"
            r="4"
          />
        </template>
      </ACircle>

      <ACircle
        :value="slices"
        :is-percent="isPercent"
        class="text-8xl"
        ring-classes="hidden"
        type="pie"
      />
    </div>
  </div>
</template>
