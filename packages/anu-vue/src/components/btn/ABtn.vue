<script lang="ts" setup>
import type { LayerProps } from '@/composables/useLayer'
import { useLayer } from '@/composables/useLayer'
import { useSpacing } from '@/composables/useSpacing'

interface Props extends LayerProps {
  spacing?: number
  icon?: string
  appendIcon?: string
  iconOnly?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'fill',
  states: true,
  dismissible: false,
  modelValue: undefined,
})

defineOptions({
  name: 'ABtn',
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
  <button
    :tabindex="props.disabled ? -1 : 0"
    :style="[
      ...styles,
      { '--a-spacing': spacing / 100 },
    ]"
    class="whitespace-nowrap inline-flex justify-center items-center"
    :class="[
      props.iconOnly ? 'a-btn-icon-only' : 'a-btn',
      props.disabled && 'opacity-50 pointer-events-none',
      classes,
    ]"
    :disabled="props.disabled ? true : undefined"
  >
    <i
      v-if="props.icon"
      :class="props.icon"
    />
    <slot />
    <i
      v-if="props.appendIcon"
      :class="props.appendIcon"
    />
  </button>
</template>
