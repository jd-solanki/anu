import type { ALoaderProps } from 'anu-vue/components/loader'
import { aTypographyProps, aTypographySlots } from 'anu-vue/components/typography'
import { aLayerProps } from 'anu-vue/composables/useLayer'
import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aCardProps = {
  ...aLayerProps,
  ...aTypographyProps,

  /**
   * Render image at the top of the card (_above header_)
   */
  img: String,

  /**
   * `alt` attribute for image rendered via `img` prop
   */
  imgAlt: String,

  /**
   * Set loading state
   */
  loading: {
    // TODO: Check for undefined
    type: [Boolean, Object] as PropType<boolean | ALoaderProps>,
    default: undefined,
  },
} as const
export type ACardProps = ExtractPublicPropTypes<typeof aCardProps>

// 👉 Slots
const { default: _, ...aCardTypographySlots } = aTypographySlots
export { aCardTypographySlots }

export const aCardOwnSlots = {
  /**
   *  Default slot for rendering card content
   */
  default: (_: any) => null as any,
} as const

export const aCardSlots = {
  ...aCardTypographySlots,
  ...aCardOwnSlots,
} as const
