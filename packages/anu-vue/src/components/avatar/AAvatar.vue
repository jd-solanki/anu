<script lang="ts" setup>
import { toRef } from 'vue'
import type { aAvatarSlots } from './meta'
import { aAvatarProps } from './meta'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(aAvatarProps)
defineSlots<typeof aAvatarSlots>()

defineOptions({
  name: 'AAvatar',
})

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)
</script>

<template>
  <div
    class="a-avatar overflow-hidden inline-flex items-center justify-center flex-shrink-0"
    :class="classes"
    :style="styles"
  >
    <slot>
      <img
        v-if="props.src"
        :src="props.src"
        :alt="props.alt"
      >
      <i
        v-else-if="props.icon"
        :class="props.icon"
      />
      <span v-else>{{ props.content }}</span>
    </slot>
  </div>
</template>
