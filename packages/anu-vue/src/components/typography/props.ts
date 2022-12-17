import type { ConfigurableValue } from '@/composables/useConfigurable'

export interface TypographyProps {
  title?: ConfigurableValue
  subtitle?: ConfigurableValue
  text?: ConfigurableValue
  titleTag?: string
  subtitleTag?: string
  textTag?: string
}

export const typographyPropsDefaults: Partial<TypographyProps> = {
  titleTag: 'span',
  subtitleTag: 'span',
  textTag: 'span',
}
