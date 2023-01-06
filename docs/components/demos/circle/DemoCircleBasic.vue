<script lang="ts" setup>
import { computed, ref } from 'vue'

const isPercent = ref(true)

const val1 = ref(20)
const val2 = ref(40)
const val3 = ref(10)
const arcs = computed(() => [
  { value: val1.value, class: 'stroke-primary', color: 'primary', startOffset: 20, endOffset: 10, offset: 10 },
  { value: val2.value, class: 'stroke-danger', color: 'danger', startOffset: 20, endOffset: 10 },
  { value: val3.value, class: 'stroke-success', color: 'success', startOffset: 20, endOffset: 10 },
])
const slices = computed(() => [
  { value: val1.value, class: 'stroke-primary stroke-full' },
  { value: val2.value, class: 'stroke-danger stroke-full', offset: 10 },
  { value: val3.value, class: 'stroke-success stroke-full' },
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
        :value="arcs"
        :is-percent="isPercent"
        class="text-8xl stroke-cap-auto"
      />
      <ACircle
        :value="arcs"
        :is-percent="isPercent"
        class="text-8xl"
        rounded
      >
        <template #default="{ circles, total }">
          <circle
            v-for="(dot, i) in circles"
            :key="i"
            :class="`fill-${dot.color} stroke-white`"
            :cx="dot.startX"
            :cy="dot.startY"
            r="8"
          />
          <circle
            v-for="(dot, i) in circles"
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
        class="text-8xl stroke-cap-auto"
        ring-classes="hidden"
      />
    </div>

    <div class="flex gap-6">
      <ACircle
        :value="arcs"
        class="text-5xl"
        rounded
      />
      <ACircle
        :value="arcs"
        class="text-5xl stroke-cap-auto filter-revert-layer stroke-3"
      />
    </div>

    <!-- Alert -->
    <AAlert color="info">
      Fruitcake I love liquorice apple pie croissant.
      <!-- <ACircle
        :loading="value"
        inner
        class="text-2xl"
        @click:close="value = false"
      /> -->
    </AAlert>

    <!-- Avatar -->
    <!-- <ACircle
      :loading="value"

      @click:close="value = false"
    >
      <AAvatar src="/images/demo/portrait-1.jpg" />
    </ACircle> -->
  </div>
</template>
