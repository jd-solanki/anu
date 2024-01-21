<script lang="ts" setup>
import { AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from 'radix-vue';
import type { AAccordionItemProps } from './meta';

const props = defineProps<AAccordionItemProps>()

const accordionItemValue = computed(() => props.value ?? `a-accordion-item-${Math.random().toString(36).slice(2, 7)}`)

defineOptions({
  name: 'AAccordionItem',
})
</script>

<template>
    <AccordionItem class="a-accordion-item" :value="accordionItemValue" :disabled="props.disabled">
        <AccordionHeader class="a-accordion-header">
            <AccordionTrigger class="a-accordion-trigger">
                <slot name="before-title" />
                <!-- ℹ️ Can we use radix slot here? -->
                <slot name="title"><span class="a-accordion-title">{{ props.title }}</span></slot>
                <slot name="after-title" />
            </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="a-accordion-content">
            <slot></slot>
        </AccordionContent>
    </AccordionItem>
</template>
