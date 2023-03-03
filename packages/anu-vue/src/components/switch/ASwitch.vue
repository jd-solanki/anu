<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes, PropType } from 'vue'
import { useCheckbox } from '@/composables'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

const props = defineProps({
  /**
     * Switch color
     */
  color: defu({
    default: 'primary',
  }, colorProp),

  /**
     * Define label text
     */
  label: String,

  /**
     * Bind v-model value
     */
  modelValue: {
    type: [Boolean, Number, String, Array, Set] as PropType<string | number | boolean | unknown[]>,
    default: true,
  },

  /**
   * Switch value when in on state
   */
  onValue: [Boolean, Number, String, Array, Set] as PropType<string | number | boolean | unknown[]>,

  /**
   * Switch value when in off state
   */
  offValue: {
    type: [Boolean, Number, String, Array, Set] as PropType<string | number | boolean | unknown[]>,
    default: false,
  },

  /**
     * Icon to render when switch is on
     */
  onIcon: String,

  /**
     * Icon to render when switch is off
     */
  offIcon: String,

  /**
   * Bind classes to input element
   */
  inputClasses: { type: null },

  /**
     * Disable switch
     */
  disabled: disabledProp,
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ASwitch',
  inheritAttrs: false,
})

defineSlots<{

  /**
   * Default slot for rendering switch label. If default slot is used `label` prop will be discarded.
   */
  default: {}
}>()

const attrs = useAttrs()

const _trueValue = computed(() => props.onValue || attrs.value || true)
const { isChecked, onChange } = useCheckbox(toRef(props, 'modelValue'), emit, _trueValue, toRef(props, 'offValue'))

const elementId = `a-switch-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`

const dotPosition = computed(() => {
  if (!isChecked.value)
    return { transform: 'translateX(0)' }
  else return { transform: 'translateX(calc(var(--a-switch-track-size) - 100% - (var(--a-switch-thumb-margin) *2 )))' }
})
</script>

<template>
  <label
    :for="elementId"
    class="a-switch cursor-pointer rounded-full justify-between items-center"
    :class="[
      $attrs.class,
      props.label || $slots.default
        ? 'flex'
        : 'inline-flex',
      props.disabled && 'a-switch-disabled pointer-events-none',
    ]"
  >

    <input
      v-bind="{ ...$attrs, class: props.inputClasses }"
      :id="elementId"
      :checked="isChecked"
      class="hidden"
      role="switch"
      type="checkbox"
      @change="onChange"
    >

    <!-- 👉 Label -->
    <div class="a-switch-label">
      <slot>{{ props.label }}</slot>
    </div>

    <!-- 👉 Switch -->
    <!-- min width should be double the dot size -->
    <div
      class="a-switch-toggle flex rounded-inherit min-w-$a-switch-track-size"
      :class="isChecked
        ? `bg-${props.color}`
        : 'bg-[hsl(var(--a-switch-default-color))]'"
    >
      <div
        class="a-switch-dot grid place-items-center rounded-inherit m-$a-switch-thumb-margin"
        :style="dotPosition"
      >
        <div
          class="a-switch-icon color-$a-switch-icon-color"
          :class="[
            isChecked
              ? `${props.onIcon} text-${props.color}`
              : props.offIcon,
          ]"
        />
      </div>
    </div>
  </label>
</template>
