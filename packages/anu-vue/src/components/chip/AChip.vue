<script lang="ts" setup>
import type { PropType } from 'vue'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

const props = defineProps({
  ...useLayerProps({
    color: {
      default: 'primary',
    },
    variant: {
      default: 'light',
    },
  }),

  /**
   * Bind v-model value to show/hide the chip.
   */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  /**
   * Allow to close chip
   */
  closable: Boolean,

  /**
   * prepend icon
   */
  icon: configurableProp,

  /**
   * append icon
   */
  appendIcon: configurableProp,

  /**
   * Disable state of component
   */
  disabled: disabledProp,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click:close'): void
  (e: 'click:appendIcon'): void
}>()

defineOptions({
  name: 'AChip',
})

defineSlots<{

  /**
   * Default slot for rendering chip content
   */
  default: {}
}>()

const attrs = useAttrs()

const { getLayerClasses } = useLayer()

const isClickable = computed(() => attrs.onClick !== undefined)

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  isClickable,
)

const closeChip = () => {
  emit('update:modelValue', false)
  emit('click:close')
}
</script>

<template>
  <div
    v-if="props.modelValue"
    :style="styles"
    class="a-chip"
    :class="[
      {
        'a-chip-disabled': props.disabled,
        'cursor-pointer': isClickable,
      },
      classes,
    ]"
  >
    <!-- Prepend icon -->
    <i
      v-if="props.icon"
      :class="props.icon"
    />

    <!-- Default slot -->
    <slot />

    <!-- Append icon -->
    <i
      v-if="props.appendIcon"
      :class="props.appendIcon"
    />

    <!-- Close icon -->
    <i
      v-if="props.closable"
      class="i-bx-x hover:i-bx-bxs-x-circle hover:opacity-70"
      @click="closeChip"
    />
  </div>
</template>
