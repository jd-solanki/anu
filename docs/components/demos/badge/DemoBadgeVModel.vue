<script lang="ts" setup>
import { ref } from 'vue'

const showBadge = ref(true)
</script>

<template>
  <div class="flex items-center flex-wrap gap-8">
    <ABadge
      v-model="showBadge"
      content="9"
    >
      <i class="i-bx-bell w-6 h-6" />
    </ABadge>
    <ABtn
      class="min-w-[128px]"
      @click="showBadge = !showBadge"
    >
      {{ showBadge ? "Hide badge" : "Show badge" }}
    </ABtn>
  </div>
</template>

