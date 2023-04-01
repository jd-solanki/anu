<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import { AIcon } from '@/components'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { configurable as configurableProp } from '@/composables/useProps'

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
   * prepend icon
   */
  icon: configurableProp,

  /**
   * append (close) icon
   */
  appendIcon: configurableProp,

  /**
   * Make alert dismissible using this prop. Adds close icon as appended icon.
   */
  dismissible: Boolean,

  /**
   * Hide/Show alert based on v-model value
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
})

const emit = defineEmits<{

  /**
   * Emitted when append icon is clicked, including close icon in closable alert.
   */
  (e: 'click:appendIcon'): void

  /**
   * Emitted when `modelValue` is updated
   */
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'AAlert',
})

defineSlots<{

  /**
   * Default slot for rendering alert content
   */
  default: {}
}>()

const isAlertVisible = useVModel(props, 'modelValue', emit, { defaultValue: true, passive: true })

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

// 👉 Append icon
const appendIcon = props.appendIcon || (props.dismissible ? 'i-bx-x' : null)
const handleAppendIconClick = () => {
  isAlertVisible.value = false

  // Emit append icon click event
  emit('click:appendIcon')
}

const appendIconBindings = computed(() => {
  if (props.dismissible) {
    return {
      icon: appendIcon,
      ariaLabel: 'close',
    }
  }

  return {
    class: appendIcon,
  }
})
</script>

<template>
  <div
    role="alert"
    class="a-alert items-start w-full"
    :class="[
      ...classes,
      isAlertVisible ? 'flex' : 'hidden',
    ]"
    :style="styles"
  >
    <!-- ℹ️ We need div as wrapper with span having `vertical-align: text-top` to center the icon with the text -->
    <div v-if="props.icon">
      <i :class="props.icon" />
    </div>
    <div
      class="flex-grow"
      data-no-reference
    >
      <slot />
    </div>
    <div>
      <slot name="append">
        <Component
          :is="props.dismissible ? AIcon : 'i'"
          v-if="appendIcon"
          class="align-text-top"
          v-bind="appendIconBindings"
          @click="handleAppendIconClick"
        />
      </slot>
    </div>
  </div>
</template>
