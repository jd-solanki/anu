<script lang="ts" setup>
import type { AAlertEvents, aAlertSlots } from './meta'
import { aAlertProps } from './meta'
import { AIcon } from '@/components'
import { useDefaults } from '@/composables/useDefaults'
import { useLayer } from '@/composables/useLayer'

// SECTION Meta
const _props = defineProps(aAlertProps)

const emit = defineEmits<AAlertEvents>()

defineSlots<typeof aAlertSlots>()

defineOptions({
  name: 'AAlert',
})

const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const isAlertVisible = useVModel(props, 'modelValue', emit, { defaultValue: true, passive: true })

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

// 👉 Append icon
const appendIcon = computed(() => props.appendIcon || (props.dismissible ? 'i-bx-x' : null))
function handleAppendIconClick() {
  isAlertVisible.value = false

  // Emit append icon click event
  emit('click:appendIcon')
}

const appendIconBindings = computed(() => {
  if (props.dismissible) {
    return {
      icon: appendIcon.value,
      ariaLabel: 'close',
    }
  }

  return {
    class: appendIcon.value,
  }
})
</script>

<template>
  <div
    role="alert"
    class="a-alert items-start w-full"
    v-bind="defaultsAttrs"
    :class="[
      defaultsClass,
      ...classes,
      isAlertVisible ? 'flex' : 'hidden',
    ]"
    :style="[styles, defaultsStyle]"
  >
    <!-- ℹ️ We need div as wrapper with span having `vertical-align: text-top` to center the icon with the text -->
    <div v-if="props.icon">
      <i :class="props.icon" />
    </div>
    <div
      class="flex items-center flex-grow"
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
