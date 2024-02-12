import type { AAccordionItemProps } from '@anu-vue/core';
import type { AccordionRootProps } from 'radix-vue';

export interface AAccordionProps extends AccordionRootProps {
  ui?: {
    accordionRoot?: any,
    accordionItem?: AAccordionItemProps['ui'],
  }
}