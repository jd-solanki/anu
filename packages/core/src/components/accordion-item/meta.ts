import type { AccordionItemProps } from 'radix-vue'

export interface AAccordionItemProps {
  title?: string
  value: AccordionItemProps['value']
  disabled?: AccordionItemProps['disabled']
  ui?: {
    accordionItem?: any
    accordionHeader?: any
    accordionTrigger?: any
    accordionTitle?: any
    accordionContent?: any
    accordionContentChild?: any
  }
}
