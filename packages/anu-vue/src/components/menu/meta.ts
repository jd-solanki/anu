import type { ComponentObjectPropsOptions } from 'vue'
import type { AFloatingProps } from '@/components/floating'
import { aFloatingProps } from '@/components/floating'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
const { referenceEl: _, ...aFloatingRestProps } = aFloatingProps
export interface AMenuProps extends Omit<AFloatingProps, 'referenceEl'> {}

export const aMenuProps = ({
  ...aFloatingRestProps,
} as const) satisfies Required<ComponentObjectPropsOptions<AMenuProps>>

// 👉 Slots
export const aMenuSlots = {

  /**
   * Default slot for rendering menu content
   * Generally, you will use `AList` component here.
   */
  default: {},
} as const

// 👉 Events
export interface AMenuEvents {}
