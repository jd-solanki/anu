import { typographySlots } from '@/components/typography/slots'
import { removeKeys } from '@/utils/helpers'

// TODO: Fix type

export const cardOwnSlots = {
  default: {},
} as const
export const cardTypographySlots = removeKeys(typographySlots, ['default'])

export const cardSlots = {
  ...cardOwnSlots,
  ...cardTypographySlots,
} as const
