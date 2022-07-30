<script setup lang="ts">
import { useGroupModel } from 'anu-vue'
import { ref } from 'vue'

const isMultiEnabled = ref(false)
const { options, select, value } = useGroupModel<string>({
  options: ['apple', 'banana', 'orange', 'watermelon'],
  multi: isMultiEnabled,
})

const { options: countOptions, select: countSelect, value: countValue } = useGroupModel({ options: 3 })

const { options: objOptions, select: objSelect } = useGroupModel({
  options: [
    { title: 'Home', icon: 'i-bx-home' },
    { title: 'Categories', icon: 'i-bx-category' },
    { title: 'Cart', icon: 'i-bx-basket' },
    { title: 'Profile', icon: 'i-bx-user-circle' },
  ],
})
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-6 mb-4">
      <ABtn
        v-for="option in options"
        :key="option.value"
        :variant="option.isSelected ? 'fill' : 'light'"
        @click="select(option.value)"
      >
        {{ option.value }}
      </ABtn>
    </div>
    <ACheckbox
      v-model="isMultiEnabled"
      label="Multiple Selection"
      class="mb-3"
    />
    <small class="block">Selected: {{
      isMultiEnabled
        ? value ? [...value].join(', ') : String(value)
        : String(value)
    }}</small>

    <hr class="!my-12 block">

    <div class="flex flex-wrap gap-8 mb-4">
      <ABtn
        v-for="option in countOptions"
        :key="option.value"
        :variant="option.isSelected ? 'fill' : 'light'"
        @click="countSelect(option.value)"
      >
        Index: {{ option.value }}
      </ABtn>
    </div>
    <small>Selected: {{ String(countValue) }}</small>

    <hr class="!my-12 block">

    <div class="flex flex-wrap gap-6 mb-4">
      <div
        v-for="option in objOptions"
        :key="option.value"
        class="flex flex-col gap-1 items-center cursor-pointer"
        :class="option.isSelected && 'text-primary'"
        @click="objSelect(option.value)"
      >
        <i
          :class="option.value.icon"
          class="text-lg"
        />
        <span>{{ option.value.title }}</span>
      </div>
    </div>
  </div>
</template>
