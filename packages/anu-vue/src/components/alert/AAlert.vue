<script lang="ts" setup>
import type { AAlertEvents, aAlertSlots } from './meta'
import { aAlertProps } from './meta'
import { AIcon } from '@/components'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(aAlertProps)
const emit = defineEmits<AAlertEvents>()
defineSlots<typeof aAlertSlots>()

defineOptions({
  name: 'AAlert',
})

const isAlertVisible = useVModel(props, 'modelValue', emit, { defaultValue: true, passive: true })

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

// 👉 Append icon
const appendIcon = props.appendIcon || (props.dismissible ? 'i-bx-x' : null)
function handleAppendIconClick() {
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
