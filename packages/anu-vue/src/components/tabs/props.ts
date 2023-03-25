import type { ExtractPropTypes, PropType } from 'vue'
import type { TabProps } from '@/components/tab'
import type { Transitions } from '@/transitions'
import type { LooseAutocomplete } from '@/utils/typescripts'

export const tabsProps = {
  /**
   * Active tab
   */
  modelValue: { type: null },

  /**
   * Tabs to be rendered. Array of ATab props.
   */
  tabs: {
    type: Array as PropType<(TabProps | string)[]>,
    default: () => [],
  },

  /**
   * Render tabs in vertical direction
   */
  vertical: {
    type: Boolean,
    default: false,
  },

  /**
   * Specify how tabs should be justified. Can be 'start', 'center', 'end', 'stretch''
   */
  // justify: {
  //   type: String as PropType<'start' | 'center' | 'end' | 'stretch'>,
  //   default: 'start',
  // },

  /**
   * Mark all `ATab` as stacked
   */
  stackedTabs: {
    type: Boolean,
    default: false,
  },

  /**
   * Hide tab title on mobile
   */
  hideTitleOnMobile: {
    type: Boolean,
    default: false,
  },

  /**
   * Change tab transition
   */
  transition: {
    type: String as PropType<LooseAutocomplete<Transitions>>,
    default: 'view-next',
  },
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
