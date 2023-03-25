<script lang="ts" setup>
const transitions = [
  { title: 'Fade', name: 'fade', icon: 'i-bx-border-none' },
  { title: 'Scale', name: 'scale', icon: 'i-bx-fullscreen' },
  { title: 'Slide Y', name: 'slide-y', icon: 'i-bx-up-arrow-alt' },
  { title: 'Slide Y Reverse', name: 'slide-y-reverse', icon: 'i-bx-down-arrow-alt' },
  { title: 'Scroll Y', name: 'scroll-y', icon: 'i-bx-chevrons-up' },
  { title: 'Scroll Y Reverse', name: 'scroll-y-reverse', icon: 'i-bx-chevrons-down' },
  { title: 'Slide X', name: 'slide-x', icon: 'i-bx-right-arrow-alt' },
  { title: 'Slide X Reverse', name: 'slide-x-reverse', icon: 'i-bx-left-arrow-alt' },
  { title: 'Scroll X', name: 'scroll-x', icon: 'i-bx-chevrons-right' },
  { title: 'Scroll X Reverse', name: 'scroll-x-reverse', icon: 'i-bx-chevrons-left' },
]
</script>

<template>
  <div class="grid grid-cols-2 place-items-start gap-y-18">
    <template
      v-for="{ title, name, icon } in transitions"
      :key="name"
    >
      <ABtn :icon="icon">
        <ATooltip
          class="capitalize"
          :transition="name"
          :text="`${title} Transition`"
        />
        {{ title }}
      </ABtn>
    </template>
  </div>
</template>
