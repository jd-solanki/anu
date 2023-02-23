<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import { useInternalBooleanState } from '@/composables/useInternalBooleanState'
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
  (e: 'click:appendIcon'): void
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'AAlert',
})

const { internalState: isAlertVisible, toggle: toggleAlertVisibility } = useInternalBooleanState(toRef(props, 'modelValue'), emit, 'update:modelValue', true)

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

// 👉 Append icon
const appendIcon = props.appendIcon || (props.dismissible ? 'i-bx-x' : null)
const handleAppendIconClick = () => {
  // If alert is dismissible remove/close alert
  if (props.dismissible)
    toggleAlertVisibility()

  // Emit append icon click event
  emit('click:appendIcon')
}
</script>

<template>
  <div
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
    <div class="flex-grow">
      <slot />
    </div>
    <div v-if="appendIcon">
      <div>
        <span
          class="align-text-top"
          :class="[
            appendIcon,
            { 'cursor-pointer': props.dismissible },
          ]"
          @click="handleAppendIconClick"
        />
      </div>
    </div>
  </div>
</template>
