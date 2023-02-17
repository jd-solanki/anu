import { typographySlots } from '@/components/typography/slots'

// TODO: Fix type

export const cardOwnSlots = {
  default: {},
} as const

const { default: _, ...cardTypographySlots } = typographySlots
export { cardTypographySlots }

export const cardSlots = {
  ...cardOwnSlots,
  ...cardTypographySlots,
} as const
