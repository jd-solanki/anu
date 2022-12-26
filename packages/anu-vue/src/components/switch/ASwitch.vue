<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes, PropType } from 'vue'
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
    type: [Boolean, Array, Set] as PropType<any[] | Set<any> | boolean>,
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
     * Disable switch
     */
  disabled: disabledProp,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ASwitch',
})

const attrs = useAttrs()

const elementId = `a-switch-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`
const data = useVModel(props, 'modelValue', emit)

const dotPosition = computed(() => {
  if (!data.value)
    return { transform: 'translateX(0)' }
  else return { transform: 'translateX(calc(var(--a-switch-track-size) - 100% - (var(--a-switch-thumb-margin) *2 )))' }
})
</script>

<template>
  <label
    :for="elementId"
    class="a-switch a-switch cursor-pointer uno-layer-base-rounded-full justify-between items-center"
    :class="[
      props.label || $slots.default
        ? 'flex'
        : 'inline-flex',
      props.disabled && 'a-switch-disabled pointer-events-none',
    ]"
  >

    <input
      :id="elementId"
      v-model="data"
      class="hidden"
      role="switch"
      type="checkbox"
    >

    <!-- 👉 Label -->
    <div class="a-switch-label">
      <slot>{{ props.label }}</slot>
    </div>

    <!-- 👉 Switch -->
    <!-- min width should be double the dot size -->
    <div
      class="a-switch-toggle flex rounded-inherit min-w-$a-switch-track-size"
      :class="data
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
            data
              ? `${props.onIcon} text-${props.color}`
              : props.offIcon,
          ]"
        />
      </div>
    </div>
  </label>
</template>
