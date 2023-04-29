<script lang="ts" setup>
import { useTimeout } from '@vueuse/core'
import { ref } from 'vue'

const { ready, start } = useTimeout(1000, { controls: true })

const alertLoading = ref(false)

const isDialogShown = ref(false)
const isDrawerShown = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <!-- Alert -->
    <AAlert
      variant="fill"
      class="relative cursor-pointer"
      icon="i-bx-info-circle"
      @click="alertLoading = !alertLoading"
    >
      Click me to toggle loading
      <ALoader :loading="alertLoading" />
    </AAlert>
    <!-- Dialog -->
    <ADialog
      v-model="isDialogShown"
      title="Dialog title"
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
      :loading="!ready"
      class="[--a-loader-overlay-bg-opacity:1]"
    />
    <ABtn @click="isDialogShown = true; start()">
      Show dialog
    </ABtn>
    <!-- Drawer -->
    <ADrawer
      v-model="isDrawerShown"
      title="Drawer title"
      subtitle="Chocolate cake tiramisu donut"
      :loading="!ready"
      class="[--a-loader-overlay-bg-opacity:1]"
    />
    <ABtn @click="isDrawerShown = true; start()">
      Show drawer
    </ABtn>
  </div>
</template>
