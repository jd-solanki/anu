<script lang="ts" setup>
import type { ASwitchEvents, ASwitchProps, aSwitchSlots } from './meta'
import { aSwitchProps } from './meta'
import { useCheckbox } from '@/composables'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aSwitchProps)
const emit = defineEmits<ASwitchEvents>()

defineOptions({
  name: 'ASwitch',
  inheritAttrs: false,
})

defineSlots<typeof aSwitchSlots>()
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const attrs = useAttrs()

const _onValue = computed<Exclude<ASwitchProps['onValue'], undefined>>(() => props.onValue || attrs.value as Exclude<ASwitchProps['onValue'], undefined> || true)
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
    v-bind="defaultsAttrs"
    :for="elementId"
    :style="defaultsStyle"
    class="a-switch cursor-pointer rounded-full justify-between items-center"
    :class="[
      $attrs.class,
      props.label || $slots.default
        ? 'flex'
        : 'inline-flex',
      props.disabled && 'a-switch-disabled pointer-events-none',
      defaultsClass,
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
    <div
      class="a-switch-label"
      data-no-reference
    >
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
