import type { ComponentObjectPropsOptions } from 'vue'
import type { ALoaderProps } from '@/components/loader'
import type { ATypographyProps } from '@/components/typography'
import { aTypographyProps, aTypographySlots } from '@/components/typography'
import type { ALayerProps } from '@/composables/useLayer'
import { aLayerProps } from '@/composables/useLayer'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ACardProps extends ALayerProps, ATypographyProps {

  /**
   * Render image at the top of the card (_above header_)
   */
  img?: string

  /**
   * `alt` attribute for image rendered via `img` prop
   */
  imgAlt?: string

  /**
   * Set loading state
   */
  loading?: boolean | ALoaderProps
}

export const aCardProps = ({
  ...aLayerProps,
  ...aTypographyProps,
  img: String,
  imgAlt: String,
  loading: {
    // TODO: Check for undefined
    type: [Boolean, Object] as PropType<boolean | ALoaderProps>,
    default: undefined,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ACardProps>>

// 👉 Slots
const { default: _, ...aCardTypographySlots } = aTypographySlots
export { aCardTypographySlots }

export const aCardOwnSlots = {
  /**
   *  Default slot for rendering card content
   */
  default: {},
} as const

export const aCardSlots = {
  ...aCardTypographySlots,
  ...aCardOwnSlots,
} as const

// 👉 Events
export interface ACardEvents {}
