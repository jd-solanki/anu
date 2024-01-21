<script setup lang="ts">
import { AAccordionItem } from '@anu-vue/core';
import { AccordionRoot } from 'radix-vue';
import type { AAccordionProps } from './meta';


const props = defineProps<AAccordionProps>()

// ℹ️ Should Vue auto pass down modelValue as well as prop like other attrs?
const modelValue = defineModel<string | string[]>()

const accordionType = computed(() => props.type ?? Array.isArray(modelValue.value) ? 'multiple' : 'single')

defineOptions({
  name: 'AAccordion',
})
</script>

<template>
  <AccordionRoot v-model="modelValue" :default-value="props.defaultValue" :type="accordionType" class="a-accordion-root">
    <slot>
    <template v-for="(item, index) in props.items" :key="index">
      <AAccordionItem v-bind="item">

        <!-- Consume default slot & rename it -->
        <template #default>
          <slot :name="`${item.value ?? index}-content`"></slot>
        </template>

        <!-- ℹ️ Pass down slots to child -->
        <template #before-title>
          <slot name="before-title" :item="item"></slot>
        </template>

        <template #title>
          <slot name="title" :item="item"></slot>
        </template>

        <template #after-title>
          <slot name="after-title" :item="item"></slot>
        </template>
        
      </AAccordionItem>
    </template>
    </slot>
  </AccordionRoot>
</template>