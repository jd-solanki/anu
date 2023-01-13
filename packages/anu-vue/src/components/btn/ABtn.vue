<script lang="ts" setup>
import { ALoader } from '@/components/loader'
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

  /**
   * Set loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
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
  <!-- ❗ relative class is required for loader. states also adds relative class but it can be turned off via prop -->
  <button
    :tabindex="props.disabled ? -1 : 0"
    :style="[
      ...styles,
      { '--a-spacing': spacing / 100 },
    ]"
    class="whitespace-nowrap inline-flex justify-center items-center relative"
    :class="[
      props.iconOnly ? 'a-btn-icon-only' : 'a-btn',
      props.disabled && 'opacity-50 pointer-events-none',
      classes,
    ]"
    :disabled="props.disabled ? true : undefined"
  >
    <ALoader
      v-if="props.loading"
      overlay
    />
    <i
      v-if="props.icon && !props.loading"
      :class="props.icon"
    />
    <slot />
    <i
      v-if="props.appendIcon"
      :class="props.appendIcon"
    />
  </button>
</template>
