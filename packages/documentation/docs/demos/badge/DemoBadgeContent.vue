<script setup lang="ts">
import { ref } from 'vue'

const badgeContent = ref('9')
</script>

<template>
  <AInput
    v-model="badgeContent"
    label="Badge content"
    placeholder="Write your badge content"
    class="sm:w-1/2"
  />
  <br>
  <div class="flex flex-wrap gap-8">
    <ABadge :content="badgeContent">
      <i class="i-bx-bell w-6 h-6" />
    </ABadge>
    <ABadge>
      <template #content>
        {{ badgeContent }}
      </template>
      <i class="i-bx-bell w-6 h-6" />
    </ABadge>
  </div>
</template>
