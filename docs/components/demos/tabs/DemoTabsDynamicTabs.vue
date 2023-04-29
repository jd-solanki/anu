<script lang="ts" setup>
import { ref } from 'vue'

const tabs = ref([
  'Tab 1',
  'Tab 2',
  'Tab 3',
])

const addTab = () => {
  tabs.value.push(`Tab ${tabs.value.length + 1}`)
}

const removeTab = () => {
  tabs.value.pop()
}
</script>

<template>
  <ATabs
    class="a-tabs-bordered"
    :tabs="tabs"
  />
  <div class="mt-4">
    <ABtn
      variant="text"
      @click="addTab"
    >
      Add Tab
    </ABtn>
    <ABtn
      variant="text"
      @click="removeTab"
    >
      Remove Tab
    </ABtn>
  </div>
</template>
