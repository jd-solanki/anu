import type { LiteralUnion, Simplify } from 'type-fest'
import type { StyleValue } from 'vue'

import type { AAccordionProps } from './components/accordion'
import type { AAccordionItemProps } from './components/accordion-item'

interface ComponentProps {
  AAccordion: AAccordionProps
  AAccordionItem: AAccordionItemProps
}

// eslint-disable-next-line unused-imports/no-unused-vars
type PluginOptionDefaultsKeys = LiteralUnion<keyof ComponentProps, string>

export type PluginOptionDefaults = {
  [key in keyof ComponentProps]: Simplify<ComponentProps[key]>
  & PluginOptionDefaults
  & {
    class: any
    style: StyleValue
    attrs: Record<string, unknown>
  }
}
