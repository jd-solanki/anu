<script lang="ts" setup>
import type { AAccordionProps } from '@anu-vue/core';

const items: AAccordionProps['items'] = [
    { title: 'awesome', value: 'awesome' },
    { title: 'I like it', value: 'like' },
]
</script>

<template>
    <AAccordion :items="items">
        <template #awesome-content>
            Awesome Content
        </template>

        <template #like-content>
            I like it Content
        </template>
    </AAccordion>
</template>
