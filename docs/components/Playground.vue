<script lang="ts" setup>
const colors = [
  'primary',
  'success',
  'info',
  'warning',
  'danger',
]
</script>

<template>
  <div class="container mx-auto min-h-screen">
    <ACard
      title="Playground"
      class="m-8"
    >
      <div class="a-card-body flex items-center gap-4">
        <ABtn
          v-for="color in colors"
          :key="color"
          class="focus:ring-4 transition-shadow transition-ease-both ring-offset-0 ring-[hsla(var(--a-layer-c),.35)]"
          :color="color"
        >
          {{ color }}
        </ABtn>
        <AIcon icon="i-bx-home" />
      </div>
    </ACard>
  </div>
</template>
