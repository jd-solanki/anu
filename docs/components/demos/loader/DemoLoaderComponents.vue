<script lang="ts" setup>
import { ref } from 'vue'

const btnLoading = ref(false)
const iconBtnLoading = ref(false)
const cardLoading = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-x-4 gap-y-6">
    <ABtn
      :loading="btnLoading"
      @click="btnLoading = !btnLoading"
    >
      Button
    </ABtn>

    <ABtn
      :loading="iconBtnLoading"
      icon-only
      icon="i-bx-cloud-upload"
      @click="iconBtnLoading = !iconBtnLoading"
    />

    <!-- Card -->
    <ACard
      title="Click me"
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
      :loading="cardLoading"
      @click="cardLoading = !cardLoading"
    />
  </div>
</template>
