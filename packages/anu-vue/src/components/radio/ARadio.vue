<script lang="ts" setup>
import type { ColorProp } from '@/composables/useProps'

type ModelValue = string

interface Props {
  color?: ColorProp
  modelValue?: ModelValue
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

defineOptions({
  name: 'ARadio',
})

const attrs = useAttrs()

const elementId = `a-radio-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`
const isChecked = computed(() => props.modelValue === attrs.value)
</script>

<template>
  <label
    :for="elementId"
    class="inline-flex items-center cursor-pointer"
    :class="[
      props.disabled && 'a-radio-disabled pointer-events-none',
    ]"
  >

    <!-- TODO: Try to avoid classes like next:checked:xxx so we can omit them in safelist -->
    <input
      v-bind="$attrs"
      :id="elementId"
      :checked="isChecked"
      class="hidden"
      type="radio"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <div
      class="a-radio-circle after:w-full after:h-full after:rounded-full after:block after:content-empty after:transform after:transition after:transition-transform"
      :class="[
        `after:bg-${props.color}`,
        isChecked ? `after:scale-full border-${props.color}` : 'after:scale-0 border-[hsla(var(--a-base-color),var(--a-border-opacity))]',
      ]"
    />
    <!-- 👉 Slot: default -->
    <slot>{{ props.label }}</slot>
  </label>
</template>
