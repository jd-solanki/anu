import { typographySlots } from '@/components/typography/slots'

// TODO: Fix type

export const cardOwnSlots = {
  /**
   *  Default slot for rendering card content
   */
  default: {},
}

const { default: _, ...cardTypographySlots } = typographySlots
export { cardTypographySlots }

export const cardSlots = {
  ...cardOwnSlots,
  ...cardTypographySlots,
}
