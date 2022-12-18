<script lang="ts" setup>
import { toRef } from 'vue'
import type { AvatarProps } from './props'
import { useLayer } from '@/composables/useLayer'
import { useSpacing } from '@/composables/useSpacing'

const props = withDefaults(defineProps<AvatarProps>(), {
  color: 'primary',
  variant: 'light',
  alt: 'avatar',
})

defineOptions({
  name: 'AAvatar',
})

const spacing = useSpacing(toRef(props, 'spacing'))
const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)
</script>

<template>
  <div
    class="a-avatar overflow-hidden inline-flex items-center justify-center"
    :class="classes"
    :style="[
      ...styles,
      { '--a-spacing': spacing / 100 },
    ]"
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
