<script lang="ts" setup>
import { ref } from 'vue'

const selected = ref()
const frameworks = [
  { text: 'VueJS', value: 'vue', icon: 'i-logos-vue', style: 'color: #42b883' },
  { text: 'ReactJS', value: 'react', icon: 'i-logos-react', style: 'color: #00d8ff' },
  { text: 'AngularJS', value: 'angular', icon: 'i-logos-angular', style: 'color: #b52e31' },
  { text: 'SolidJS', value: 'solid', icon: 'i-logos-solidjs-icon', style: 'color: #4e84c1' },
  { text: 'AlpineJS', value: 'alpine', icon: 'i-logos-alpinejs-icon', style: 'color: #77c1d2' },
]
</script>

<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch">
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
