<script lang="ts" setup>
import type { ColorProp } from '@/composables/useProps'

type ModelValue = any[] | Set<any> | boolean

interface Props {
  color?: ColorProp
  label?: string
  modelValue?: ModelValue
  onIcon?: string
  offIcon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  modelValue: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
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
