import type { ExtractPublicPropTypes } from 'vue'
import type { ATabProps } from '@/components/tab'
import { transition as transitionProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

/**
 * Specify how tabs should be justified. Can be 'start', 'center', 'end', 'stretch''
  justify: {
    type: String as PropType<'start' | 'center' | 'end' | 'stretch'>,
    default: 'start',
  },
 */

// 👉 Props
export const aTabsProps = {
  /**
   * Active tab
   */
  modelValue: { type: null },

  /**
   * Tabs to be rendered. Array of ATab props.
   */
  tabs: {
    type: Array as PropType<(ATabProps | string)[]>,
    default: () => [],
  },

  /**
   * Render tabs in vertical direction
   */
  vertical: Boolean,

  /**
   * Mark all `ATab` as stacked
   */
  stackedTabs: Boolean,

  /**
   * Hide tab title on mobile
   */
  hideTitleOnMobile: Boolean,

  /**
   * Change tab transition
   */
  transition: transitionProp,
} as const
export type ATabsProps = ExtractPublicPropTypes<typeof aTabsProps>

// 👉 Slots
export const aTabsSlots = {
  tabs: (_: any) => null as any,
  default: (_: { name: any }) => null as any,
} as const

// 👉 Events
export interface ATabsEvents {
  (e: 'update:modelValue', value: ATabsProps['modelValue']): void
}
