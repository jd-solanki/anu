<script lang="ts" setup>
import { useTimeout } from '@vueuse/core'
import { ref } from 'vue'

const { ready, start, stop } = useTimeout(1000, { controls: true })

const isDialogShown = ref(false)
const isDrawerShown = ref(false)
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <!-- Alert -->
    <AAlert
      color="info"
      variant="fill"
      class="relative"
      @click="ready && start()"
    >
      AAlert component. Click to start loading...
      <ALoader
        :loading="!ready"
        overlay
        class="text-2xl"
      />
    </AAlert>

    <!-- Card -->
    <ACard
      variant="fill"
      color="danger"
      title="Card title"
      subtitle="Chocolate cake tiramisu donut"
      class="relative"
      @click="ready && start()"
    >
      <div class="a-card-body a-card-spacer">
        <p class="text-sm">
          <ALoader
            :loading="!ready"
            overlay
            class="text-3xl"
            title="It's loading..."
            subtitle="Click to stop loading."
            @click.stop="stop()"
          />
          Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate
          bar.
        </p>
      </div>
    </ACard>

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
        class="text-6xl"
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
        class="text-6xl"
      />
    </ADrawer>

    <ABtn @click="isDrawerShown = true; start()">
      Show drawer
    </ABtn>

    <div class="flex gap-6">
      <!-- Badge -->
      <ABadge :content="9">
        <ABtn
          :loading="!ready"
          @click="ready && start()"
        >
          Button
        </ABtn>
      </ABadge>

      <!-- Button -->
      <ABtn
        :loading="!ready"
        icon="i-bx-wink-smile"
        @click="ready && start()"
      >
        Loading icon
      </ABtn>

      <ABtn
        color="success"
        variant="light"
        class="text-2xl"
        :loading="!ready"
        icon-only
        icon="i-bx-dollar-circle"
        @click="ready && start()"
      />

      <!-- Input -->
      <AInput
        :loading="!ready"
        placeholder="Type to load"
        append-inner-icon="i-bx-check-double"
        @keypress="ready && start()"
      />
    </div>
  </div>
</template>
