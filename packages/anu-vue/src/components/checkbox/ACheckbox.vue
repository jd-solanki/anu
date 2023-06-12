<script lang="ts" setup>
import type { ACheckboxEvents, ACheckboxProps, aCheckboxSlots } from './meta'
import { aCheckboxProps } from './meta'
import { useCheckbox } from '@/composables'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aCheckboxProps)
const emit = defineEmits<ACheckboxEvents>()
defineSlots<typeof aCheckboxSlots>()

defineOptions({
  name: 'ACheckbox',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION
const attrs = useAttrs()

const _checkedValue = computed<Exclude<ACheckboxProps['checkedValue'], undefined>>(() => props.checkedValue || attrs.value as Exclude<ACheckboxProps['checkedValue'], undefined> || true)
const { isChecked, isIndeterminate, onChange } = useCheckbox(toRef(props, 'modelValue'), emit, _checkedValue, toRef(props, 'uncheckedValue'), toRef(props, 'indeterminateValue'), toRef(props, 'cycleIndeterminate'))

const elementId = `a-checkbox-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`

const _icon = computed<ConfigurableValue>(() => {
  if (isIndeterminate.value)
    return 'i-bx-minus'
  else if (isChecked.value)
    return props.icon
})
</script>

<template>
  <label
    :for="elementId"
    class="inline-flex items-center cursor-pointer"
    :class="[
      $attrs.class,
      props.disabled && 'a-checkbox-disabled pointer-events-none',
      defaultsClass,
    ]"
    :style="defaultsStyle"
  >
    <input
      v-bind="{ ...$attrs, class: props.inputClasses, ...defaultsAttrs }"
      :id="elementId"
      :checked="isChecked"
      class="hidden"
      type="checkbox"
      :indeterminate="isIndeterminate"
      @change="onChange"
    >
    <div
      class="a-checkbox-box flex items-center justify-center shrink-0"
      :class="[(isChecked || isIndeterminate) && `bg-${props.color} border-${props.color} children:scale-full`]"
    >
      <i
        class="a-checkbox-icon scale-0 text-white"
        :class="_icon"
      />
    </div>
    <slot>{{ props.label }}</slot>
  </label>
</template>
