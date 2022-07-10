<script lang="ts" setup>
import { ref } from 'vue'

const selected = ref()
const frameworks = [
  { label: 'VueJS', value: 'vue', icon: 'i-logos-vue', brandColor: '#42b883' },
  { label: 'ReactJS', value: 'react', icon: 'i-logos-react', brandColor: '#00d8ff' },
  { label: 'AngularJS', value: 'angular', icon: 'i-logos-angular', brandColor: '#b52e31' },
  { label: 'SolidJS', value: 'solid', icon: 'i-logos-solidjs-icon', brandColor: '#4e84c1' },
  { label: 'AlpineJS', value: 'alpine', icon: 'i-logos-alpinejs-icon', brandColor: '#2d3441' },
]
const color = '#fff'
</script>

<template>
  <div class="grid-row grid-cols-2 place-items-stretch">
    <ASelect
      v-slot="{ attrs }"
      v-model="selected"
    >
      <li
        v-for="framework in frameworks"
        v-bind="attrs"
        :key="framework"
        class="flex items-center gap-x-3"
        @click="selected = framework"
      >
        <div :class="framework.icon" />
        <span>{{ framework.label }}</span>
      </li>
    </ASelect>
  </div>
</template>
