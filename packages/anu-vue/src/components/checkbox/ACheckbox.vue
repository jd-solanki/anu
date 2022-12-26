<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { color as colorProp, configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

const props = defineProps({
  /**
   * Checkbox color
   */
  color: defu({ default: 'primary' }, colorProp),

  /**
   * Bind v-model value to check/uncheck the checkbox.
   */
  modelValue: [Boolean, Array, Set] as PropType<boolean | unknown[] | Set<unknown>>,

  /**
   * Label text
   */
  label: String,

  /**
   * Icon to render in checkbox square instead of check
   */
  icon: defu({ default: 'i-bx-check' }, configurableProp),

  /**
   * Disable checkbox
   */
  disabled: disabledProp,

  /**
   * Mark checkbox indeterminate
   */
  indeterminate: Boolean,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ACheckbox',
})

const attrs = useAttrs()

const elementId = `a-checkbox-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`
const data = useVModel(props, 'modelValue', emit)

// Template refs
const refCheckbox = ref()

const _icon = ref<ConfigurableValue>('')

watch([data, () => props.indeterminate], ([checked, indeterminate], [_, prevIndeterminate]) => {
  // Set indeterminate state of HTMLInputElement
  if (refCheckbox.value)
    refCheckbox.value.indeterminate = indeterminate

  _icon.value = !indeterminate && (!prevIndeterminate || checked) ? props.icon : 'i-bx-minus'
}, { immediate: true })

const state = computed(() => {
  return typeof data.value === 'boolean'
    ? data.value
    : Array.isArray(data.value)
      ? data.value.includes(attrs.value)
      : data.value?.has(attrs.value) // For Set type
})
</script>

<template>
  <label
    :for="elementId"
    class="inline-flex items-center cursor-pointer"
    :class="[props.disabled && 'a-checkbox-disabled pointer-events-none']"
  >
    <input
      :id="elementId"
      :ref="refCheckbox"
      v-model="data"
      class="hidden"
      type="checkbox"
      v-bind="attrs"
    >
    <div
      class="a-checkbox-box flex items-center justify-center shrink-0"
      :class="[(props.indeterminate || state) && `bg-${props.color} border-${props.color} children:scale-full`]"
    >
      <i
        class="a-checkbox-icon scale-0 text-white"
        :class="_icon"
      />
    </div>
    <slot>{{ props.label }}</slot>
  </label>
</template>
