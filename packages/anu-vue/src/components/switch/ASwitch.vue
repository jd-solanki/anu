<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import type { SwitchProps } from './props'
import { switchProps } from './props'
import { useCheckbox } from '@/composables'

const props = defineProps(switchProps)
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

const _onValue = computed<Exclude<SwitchProps['onValue'], undefined>>(() => props.onValue || attrs.value as Exclude<SwitchProps['onValue'], undefined> || true)
const { isChecked, onChange } = useCheckbox(
  toRef(props, 'modelValue'),
  emit,
  _onValue,
  toRef(props, 'offValue'),
)

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
