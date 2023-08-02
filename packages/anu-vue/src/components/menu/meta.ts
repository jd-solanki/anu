import { aFloatingProps } from 'anu-vue/components/floating'
import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
const { referenceEl: _, ...aFloatingRestProps } = aFloatingProps

export const aMenuProps = {
  ...aFloatingRestProps,
} as const
export type AMenuProps = ExtractPublicPropTypes<typeof aMenuProps>

// 👉 Slots
export const aMenuSlots = {

  /**
   * Default slot for rendering menu content
   * Generally, you will use `AList` component here.
   */
  default: (_: any) => null as any,
} as const
