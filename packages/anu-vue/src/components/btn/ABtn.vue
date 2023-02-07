<script lang="ts" setup>
import { ASpinner } from '@/components/spinner'
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

const btn = ref()
const _styles = ref<{ minWidth?: string }>({})
watch(() => props.loading, val => {
  if (val && btn.value)
    _styles.value.minWidth = `${btn.value.offsetWidth}px`
})
</script>

<template>
  <button
    ref="btn"
    :tabindex="props.disabled ? -1 : 0"
    :style="[
      ...styles,
      _styles,
      { '--a-spacing': spacing / 100 },
    ]"
    class="whitespace-nowrap justify-center items-center relative"
    :class="[
      props.iconOnly ? 'a-btn-icon-only' : 'a-btn',
      props.disabled && 'opacity-50 pointer-events-none',
      classes,
    ]"
    :disabled="props.disabled ? true : undefined"
  >
    <Transition
      name="fade"
      mode="out-in"
    >
      <ASpinner v-if="props.loading" />
      <div
        v-else
        class="a-btn-content"
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
      </div>
    </Transition>
  </button>
</template>
