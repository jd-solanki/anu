<script lang="ts" setup>
import type { AAccordionProps } from '@anu-vue/core';

const items: AAccordionProps['items'] = [
    { title: 'How to purchase an Item' },
    { title: 'How to download invoice for my purchase?' },
]
</script>

<template>
    <div class="container mx-auto">
      <AAccordion :items="items">
          <template #0-content>
              Awesome Content
          </template>
          <template #1-content>
              I like it Content
          </template>
      </AAccordion>
    </div>
</template>