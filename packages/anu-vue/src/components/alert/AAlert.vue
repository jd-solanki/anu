<script lang="ts" setup>
import { useInternalBooleanState } from '@/composables/useInternalState'
import type { LayerProps } from '@/composables/useLayer'
import { useLayer } from '@/composables/useLayer'
import { useSpacing } from '@/composables/useSpacing'

interface Props extends LayerProps {
  spacing?: number
  icon?: string
  appendIcon?: string
  dismissible?: boolean
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'light',
  dismissible: false,

  // ℹ️ We need to set default value as undefined for `useInternalBooleanState` to work properly
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: 'click:appendIcon'): void
  (e: 'update:modelValue', value: boolean): void
}>()

defineOptions({
  name: 'AAlert',
})

const { internalState: isAlertVisible, toggle: toggleAlertVisibility } = useInternalBooleanState(toRef(props, 'modelValue'), emit, 'update:modelValue', true)

const spacing = useSpacing(toRef(props, 'spacing'))
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
    :style="[
      ...styles,
      { '--a-spacing': spacing / 100 },
    ]"
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
