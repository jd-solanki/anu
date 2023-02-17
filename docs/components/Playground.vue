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

const listModel = ref(null)
</script>

<template>
  <div class="cards-demo-container m-16">
    <div class="grid-row m-8">
      <AList
        v-model="listModel"
      >
        <template #default="{ handleListItemClick }">
          <AListItem @click="handleListItemClick('awesome')">
            list item
          </AListItem>
        </template>
      </AList>
      <span>listModel: {{ listModel }}</span>
      <AListItem>Awesome</AListItem>
      <ASelect
        v-model="selected"
        :options="frameworks"
      >
        <template #option-default="slotProps">
          <AListItem @click="() => slotProps.handleOptionClick('awesome')">
            Awesome - {{ slotProps }}
          </AListItem>
        </template>
      </ASelect>
    </div>
  </div>
</template>
