import type { ExtractPropTypes, PropType } from 'vue'
import type { TabProps } from '@/components/tab'

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
   * Create vertical tabs
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
  tabStacked: {
    type: Boolean,
    default: false,
  },

  transition: {
    type: String,
    default: 'view-next',
  },
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
