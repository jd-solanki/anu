<script lang="ts" setup>
import type { ARadioEvents, aRadioSlots } from './meta'
import { aRadioProps } from './meta'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aRadioProps)
const emit = defineEmits<ARadioEvents>()
defineSlots<typeof aRadioSlots>()

defineOptions({
  name: 'ARadio',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const attrs = useAttrs()

const elementId = `a-radio-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`
const isChecked = computed(() => props.modelValue === attrs.value)
</script>

<template>
  <label
    :for="elementId"
    class="inline-flex items-center cursor-pointer"
    :style="defaultsStyle"
    :class="[
      props.disabled && 'a-radio-disabled pointer-events-none',
      $attrs.class,
      defaultsClass,
    ]"
  >

    <input
      v-bind="{ ...defaultsAttrs, ...$attrs, class: props.inputClasses }"
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
