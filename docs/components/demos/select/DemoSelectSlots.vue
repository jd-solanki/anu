<script lang="ts" setup>
import { ref } from 'vue'

const selected = ref()
const frameworks = [
  { text: 'VueJS', value: 'vue', icon: 'i-logos-vue', brandColor: '#42b883' },
  { text: 'ReactJS', value: 'react', icon: 'i-logos-react', brandColor: '#00d8ff' },
  { text: 'AngularJS', value: 'angular', icon: 'i-logos-angular', brandColor: '#b52e31' },
  { text: 'SolidJS', value: 'solid', icon: 'i-logos-solidjs-icon', brandColor: '#4e84c1' },
  { text: 'AlpineJS', value: 'alpine', icon: 'i-logos-alpinejs-icon', brandColor: '#77c1d2' },
]
</script>

<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch">
    <ASelect v-model="selected">
      <template #default="{ handleListItemClick }">
        <AListItem
          v-for="framework in frameworks"
          :key="JSON.stringify(framework)"
          :style="`color: ${framework.brandColor}`"
          @click="handleListItemClick(framework.value)"
        >
          <div :class="framework.icon" />
          <span>{{ framework.text }}</span>
        </AListItem>
      </template>
    </ASelect>
  </div>
</template>
