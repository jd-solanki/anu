<script lang="ts" setup>
import { useLayer } from '@/composables/useLayer';
import { toRef } from 'vue';
import { avatarProps } from './props';

const props = defineProps(avatarProps)

defineOptions({
  name: 'AAvatar',
})

defineSlots<{

  /**
   * Default slot for rendering avatar content. If default slots is used `src`, `alt`, `icon` & `content` prop usage will be ignored.
   */
  default: {}
}>()

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
