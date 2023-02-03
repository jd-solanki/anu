<script lang="ts" setup>
import { ref } from 'vue'

const isLoading = ref(false)
</script>

<template>
  <ABtn
    v-for="v in ['fill', 'outline', 'light', 'text']"
    :key="v"
    color="success"
    :variant="v"
    :loading="isLoading"
    @click="isLoading = !isLoading"
  >
    Button
  </ABtn>
  <ACard
    title="awesome"
    variant="light"
    color="primary"
    loading
  >
    <div class="a-card-body a-card-spacer">
      <ABtn
        v-for="v in ['fill', 'outline', 'light', 'text']"
        :key="v"
        color="success"
        :variant="v"
        :loading="isLoading"
        @click="isLoading = !isLoading"
      >
        Button
      </ABtn>
      <AAlert
        color="info"
        variant="outline"
        class="relative"
      >
        Fruitcake I love liquorice apple pie croissant.
        <ALoader
          loading
          overlay
          class="text-2xl"
        />
      </AAlert>
    </div>
  </ACard>
</template>
