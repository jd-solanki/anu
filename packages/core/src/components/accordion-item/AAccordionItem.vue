<script lang="ts" setup>
import { useDefaults } from '@anu-vue/core';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from 'radix-vue';
import type { AAccordionItemProps } from './meta';

const _props = defineProps<AAccordionItemProps>()
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

const accordionItemValue = computed(() => props.value ?? `a-accordion-item-${Math.random().toString(36).slice(2, 7)}`)

defineOptions({
  name: 'AAccordionItem',
})
</script>

<template>
    <AccordionItem :class="[defaultsClass, props.ui?.accordionItem]" :style="defaultsStyle" v-bind="defaultsAttrs" class="a-accordion-item" :value="accordionItemValue" :disabled="props.disabled">
        <AccordionHeader class="a-accordion-header" :class="props.ui?.accordionHeader">
            <AccordionTrigger class="a-accordion-trigger" :class="props.ui?.accordionTrigger">
                <slot name="before-title" />
                <!-- ℹ️ Can we use radix slot here? -->
                <slot name="title">
                    <span class="a-accordion-title" :class="props.ui?.accordionTitle">{{ props.title }}</span>
                </slot>
                <slot name="after-title" />
            </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent class="a-accordion-content" :class="props.ui?.accordionContent">
            <div class="a-accordion-content-child" :class="props.ui?.accordionContentChild">
                <slot></slot>
            </div>
        </AccordionContent>
    </AccordionItem>
</template>
