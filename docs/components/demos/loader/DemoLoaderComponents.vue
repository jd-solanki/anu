<script lang="ts" setup>
import { ref } from 'vue'

const btnLoading = ref(false)
const iconBtnLoading = ref(false)
const cardLoading = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-6">
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
    <div class="cards-demo-container">
      <ACard
        title="Card title"
        subtitle="Chocolate cake tiramisu donut"
        text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
        :loading="cardLoading"
        @click="cardLoading = !cardLoading"
      />
    </div>
  </div>
</template>
