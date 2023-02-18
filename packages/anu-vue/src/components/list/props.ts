import type { ExtractPropTypes, PropType } from 'vue'
import type { ListItemProps } from '@/components/list-item'
import { listItemProps } from '@/components/list-item'

export type ListPropItems = (ListItemProps | string | number)[]

// List item props
const { avatarAppend, iconAppend, color, variant, states } = listItemProps

export const listProps = {
  /**
   * Items to render in list
   */
  'items': {
    type: Array as PropType<ListPropItems>,
    default: () => [],
  },

  /**
   * Enable selecting multiple list items
   */
  'multi': Boolean,

  /**
   * Bind v-model value to selected list item
   */
  'modelValue': null,

  // ℹ️ Workaround for checking if event is present on component instance: https://github.com/vuejs/core/issues/5220#issuecomment-1007488240
  'onClick:item': Function,

  // ℹ️ Below is list item props that will be passed to each list item

  /**
   * By default when icon props are used icon rendered at start. Use `iconAppend` to render icon at end.
   */
  iconAppend,

  /**
   * By default when avatar props are used avatar is added at start. Use `avatarAppend` to render avatar at end.
   */
  avatarAppend,

  color,
  variant,
  states,
}

export type ListProps = ExtractPropTypes<typeof listProps>
