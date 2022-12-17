import type { TypographyProps } from '@/components/typography/props'
import { typographyPropsDefaults } from '@/components/typography/props'
import type { LayerProps } from '@/composables/useLayer'

export interface CardProps extends LayerProps, TypographyProps {
  spacing?: number
  img: string
  alt: string
}

export const propDefaults = Object.assign(typographyPropsDefaults, {
  variant: 'text',
} as Partial<CardProps>)
