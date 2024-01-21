import type { AAccordionItemProps } from '@anu-vue/core';
import type { AccordionRootProps } from 'radix-vue';

export interface AAccordionProps {
  items?: AAccordionItemProps[]

  // TODO: Update it's type after this => https://github.com/radix-vue/radix-vue/issues/633
  type?: AccordionRootProps['type'],
  defaultValue?: AccordionRootProps['defaultValue'],
}