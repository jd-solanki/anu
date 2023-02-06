<script lang="ts" setup>
import { useTimeout } from '@vueuse/core'
import { ref } from 'vue'

const { ready, start, stop } = useTimeout(1000, { controls: true })

const isDialogShown = ref(false)
const isDrawerShown = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <ABtn
      :loading="!ready"
      @click="ready && start()"
    >
      Button
    </ABtn>

    <ABtn
      :loading="!ready"
      icon-only
      icon="i-bx-cloud-upload"
      @click="ready && start()"
    />

    <!-- Alert -->
    <AAlert
      variant="fill"
      class="relative"
      @click="ready && start()"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="!ready"
      />
    </AAlert>

    <!-- Card -->
    <div class="cards-demo-container">
      <ACard
        title="Card title"
        subtitle="Chocolate cake tiramisu donut"
        text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
        :loading="!ready"
        @click="ready && start()"
      />
    </div>

    <!-- Dialog -->
    <ADialog
      v-model="isDialogShown"
      title="Dialog title"
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
    >
      <ALoader
        :loading="!ready"
        overlay
        class="text-6xl bg-white"
      />
    </ADialog>

    <ABtn @click="isDialogShown = true; start()">
      Show dialog
    </ABtn>

    <!-- Drawer -->
    <ADrawer
      v-model="isDrawerShown"
      title="Drawer title"
      subtitle="Chocolate cake tiramisu donut"
    >
      <ALoader
        :loading="!ready"
        overlay
        class="text-6xl bg-white"
      />
    </ADrawer>

    <ABtn @click="isDrawerShown = true; start()">
      Show drawer
    </ABtn>
  </div>
</template>
