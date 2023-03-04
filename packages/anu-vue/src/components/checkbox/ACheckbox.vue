<script lang="ts" setup>
import type { CheckboxProps } from './props'
import { checkboxProps } from './props'
import { useCheckbox } from '@/composables'
import type { ConfigurableValue } from '@/composables/useConfigurable'

const props = defineProps(checkboxProps)

const emit = defineEmits<{
  (e: 'update:modelValue', value: CheckboxProps['modelValue']): void
}>()

defineOptions({
  name: 'ACheckbox',
  inheritAttrs: false,
})

defineSlots<{

  /**
   * Default slot for rendering checkbox label. If default slot is used `label` prop will be discarded.
   */
  default: {}
}>()

const attrs = useAttrs()

const _trueValue = computed<Exclude<CheckboxProps['onValue'], undefined>>(() => props.onValue || attrs.value as Exclude<CheckboxProps['onValue'], undefined> || true)
const { isChecked, isIndeterminate, onChange } = useCheckbox(toRef(props, 'modelValue'), emit, _trueValue, toRef(props, 'offValue'), toRef(props, 'indeterminateValue'), toRef(props, 'cycleIndeterminate'))

const elementId = `a-checkbox-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`

const _icon = computed<ConfigurableValue>(() => {
  if (isIndeterminate.value)
    return 'i-bx-minus'
  else if (isChecked.value)
    return props.icon
  else return ''
})
</script>

<template>
  <label
    :for="elementId"
    class="inline-flex items-center cursor-pointer"
    :class="[
      $attrs.class,
      props.disabled && 'a-checkbox-disabled pointer-events-none',
    ]"
  >
    <input
      v-bind="{ ...$attrs, class: props.inputClasses }"
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
