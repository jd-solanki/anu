<script lang="ts" setup>
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { configurable as configurableProp, disabled as disabledProp, spacing as spacingProp } from '@/composables/useProps'
import { useSpacing } from '@/composables/useSpacing'

const props = defineProps({
  ...useLayerProps({
    color: {
      default: 'primary',
    },
    variant: {
      default: 'fill',
    },
    states: {
      default: true,
    },
  }),
  spacing: spacingProp,
  icon: configurableProp,
  appendIcon: configurableProp,
  iconOnly: Boolean,
  disabled: disabledProp,
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
