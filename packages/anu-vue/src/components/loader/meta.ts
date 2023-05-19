import type { ExtractPublicPropTypes } from 'vue'
import { aTypographyProps, aTypographySlots } from '@/components/typography'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aLoaderProps = ({
  ...aTypographyProps,

  /**
   * Toggle loading state
   */
  loading: {
    type: Boolean,
    default: true,
  },

  /**
   * Display loader in full page mode
   */
  fullPage: {
    type: Boolean,
    default: false,
  },
} as const)
export type ALoaderProps = ExtractPublicPropTypes<typeof aLoaderProps>

// 👉 Slots
const { default: _, ...aLoaderTypographySlots } = aTypographySlots
export { aLoaderTypographySlots }

export const aLoaderOwnSlots = {
  /**
   * Default slot for rendering loader content.
   * `ATypography` content like title & subtitle will be rendered along with this slot.
   */
  default: (_: any) => null as any,
} as const

export const aLoaderSlots = {
  ...aLoaderTypographySlots,
  ...aLoaderOwnSlots,
} as const
