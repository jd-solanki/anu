<script lang="ts" setup>
import { ref } from 'vue';

const showBadge = ref(true)
</script>

<template>
    <div class="flex flex-wrap gap-8">
        <ABadge v-model="showBadge" content="9">
            <i class="i-bx-bell w-6 h-6" />
        </ABadge>
        <ABtn @click="showBadge = !showBadge">{{ showBadge ? "Hide badge" : "Show badge" }}</ABtn>
  </div>
</template>

