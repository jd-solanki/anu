<script setup lang="ts">
import { useDefaults } from '@anu-vue/core'
import { AccordionRoot } from 'radix-vue'
import type { AAccordionProps } from './meta'

defineOptions({
  name: 'AAccordion',
})

const _props = withDefaults(defineProps<AAccordionProps>(), {
  collapsible: true,
  type: 'single',
})

const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// ℹ️ Should Vue auto pass down modelValue as well as prop like other attrs?
const modelValue = defineModel<string | string[]>()

const accordionType = computed(() => props.type ?? (Array.isArray(modelValue.value) ? 'multiple' : 'single'))
</script>

<template>
  <AccordionRoot v-bind="defaultsAttrs" v-model="modelValue" :style="defaultsStyle" :class="[defaultsClass, props.ui?.accordionRoot]" :collapsible="props.collapsible" :default-value="props.defaultValue" :type="accordionType" class="a-accordion-root">
    <slot />
  </AccordionRoot>
</template>
