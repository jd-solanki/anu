<script lang="ts" setup>
import { ref } from 'vue'

const selected = ref()
const frameworks = [
  { text: 'VueJS', value: 'vue', icon: 'i-logos-vue', brandColor: '#42b883' },
  { text: 'ReactJS', value: 'react', icon: 'i-logos-react', brandColor: '#00d8ff' },
  { text: 'AngularJS', value: 'angular', icon: 'i-logos-angular', brandColor: '#b52e31' },
  { text: 'SolidJS', value: 'solid', icon: 'i-logos-solidjs-icon', brandColor: '#4e84c1' },
  { text: 'AlpineJS', value: 'alpine', icon: 'i-logos-alpinejs-icon', brandColor: '#2d3441' },
]
</script>

<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch m-8">
    <ASelect
      v-model="selected"
      :options="frameworks"
    >
      <template #option-append="{ item }">
        <span>{{ item }}</span>
      </template>
    </ASelect>
  </div>
</template>
