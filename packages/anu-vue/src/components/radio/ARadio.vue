<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import { color as colorProp, disabled as disabledProp } from '@/composables/useProps'

const props = defineProps({
  /**
   * Radio color
   */
  color: defu({
    default: 'primary',
  }, colorProp),

  /**
   * Bind v-model value to radio
   */
  modelValue: String,

  /**
   * Bind classes to input element
   */
  inputClasses: { type: null },

  /**
   * Define label text
   */
  label: String,

  /**
   * Disable radio
   */
  disabled: disabledProp,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ARadio',
  inheritAttrs: false,
})

defineSlots<{

  /**
   * Default slot for rendering radio label. If default slot is used `label` prop will be discarded.
   */
  default: {}
}>()

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
      $attrs.class,
    ]"
  >

    <input
      v-bind="{ ...$attrs, class: props.inputClasses }"
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
        isChecked ? `after:scale-full border-${props.color}` : 'after:scale-0 border-[hsla(var(--a-base-c),var(--a-border-opacity))]',
      ]"
    />
    <!-- 👉 Slot: default -->
    <slot>{{ props.label }}</slot>
  </label>
</template>
