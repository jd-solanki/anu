import type { AccordionItemProps } from 'radix-vue';

export interface AAccordionItemProps {
  title?: string
  value?: AccordionItemProps['value']
  disabled?: AccordionItemProps['disabled']
}