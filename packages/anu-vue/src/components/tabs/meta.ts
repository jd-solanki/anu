import type { LiteralUnion } from 'type-fest'
import type { ComponentObjectPropsOptions } from 'vue'
import type { ATabProps } from '@/components/tab'
import type { Transitions } from '@/transitions'
import type { NoUndefined } from '@/utils/typescripts'

// ℹ️ Make sure to checkout meta definition rules

/**
 * Specify how tabs should be justified. Can be 'start', 'center', 'end', 'stretch''
  justify: {
    type: String as PropType<'start' | 'center' | 'end' | 'stretch'>,
    default: 'start',
  },
 */

// 👉 Props
export interface ATabsProps {

  /**
   * Active tab
   */
  modelValue?: any

  /**
   * Tabs to be rendered. Array of ATab props.
   */
  tabs?: (ATabProps | string)[]

  /**
   * Render tabs in vertical direction
   */
  vertical?: boolean

  /**
   * Mark all `ATab` as stacked
   */
  stackedTabs?: boolean

  /**
   * Hide tab title on mobile
   */
  hideTitleOnMobile?: boolean

  /**
   * Change tab transition
   */
  transition?: LiteralUnion<Transitions, string>
}

export const aTabsProps = ({
  modelValue: { type: null },
  tabs: {
    type: Array as PropType<NoUndefined<ATabsProps['tabs']>>,
    default: () => [],
  },
  vertical: Boolean,
  stackedTabs: Boolean,
  hideTitleOnMobile: Boolean,
  transition: {
    type: String as PropType<NoUndefined<ATabsProps['transition']>>,
    default: 'view-next',
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ATabsProps>>

// 👉 Slots
export const aTabsSlots = {
  tabs: {},

  // TODO: fix type
  default: { name: Object as any },
} as const

// 👉 Events
export interface ATabsEvents {
  (e: 'update:modelValue', value: ATabsProps['modelValue']): void
}
