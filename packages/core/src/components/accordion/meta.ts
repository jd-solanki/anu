import type { AAccordionItemProps } from '@anu-vue/core';
import type { AccordionRootProps } from 'radix-vue';

export interface AAccordionProps {
  items?: (Partial<AAccordionItemProps> & { value?: AAccordionItemProps['value'] })[]

  // TODO: Update it's type after this => https://github.com/radix-vue/radix-vue/issues/633
  type?: AccordionRootProps['type'],

  defaultValue?: AccordionRootProps['defaultValue'],
  collapsible?: AccordionRootProps['collapsible'],

  ui?: {
    accordionRoot?: any,
    accordionItem?: AAccordionItemProps['ui'],
  }
}