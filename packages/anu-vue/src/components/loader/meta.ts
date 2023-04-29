import type { ComponentObjectPropsOptions } from 'vue'
import type { ATypographyProps } from '@/components/typography'
import { aTypographyProps, aTypographySlots } from '@/components/typography'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ALoaderProps extends ATypographyProps {

  /**
   * Toggle loading state
   */
  loading?: boolean

  /**
   * Display loader in full page mode
   */
  fullPage?: boolean
}

export const aLoaderProps = ({
  ...aTypographyProps,
  loading: {
    type: Boolean,
    default: true,
  },
  fullPage: {
    type: Boolean,
    default: false,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ALoaderProps>>

// 👉 Slots
const { default: _, ...aLoaderTypographySlots } = aTypographySlots
export { aLoaderTypographySlots }

export const aLoaderOwnSlots = {
  /**
   * Default slot for rendering loader content.
   * `ATypography` content like title & subtitle will be rendered along with this slot.
   */
  default: {},
} as const

export const aLoaderSlots = {
  ...aLoaderTypographySlots,
  ...aLoaderOwnSlots,
} as const

// 👉 Events
export interface ALoaderEvents {}
