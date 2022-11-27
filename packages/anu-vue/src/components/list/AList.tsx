import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { useGroupModel } from '../../composables'
import { isEmptyArray } from '@/utils/helpers'

import { AListItem } from '@/components/list-item'
import type { ConfigurableValue } from '@/composables/useConfigurable'

// TODO: Reuse the existing props and its types. Maybe if we create AListItem component then we can reuse prop types.
interface ListItem {
  title: ConfigurableValue
  subtitle?: ConfigurableValue
  text: ConfigurableValue
  value?: any
  disable?: boolean
  icon?: string

  // TODO: Improve typing
  avatarProps?: any

  // color: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  // variant: 'fill' | 'outline' | 'light' | 'text'
  // states?: boolean
}

export const AList = defineComponent({
  name: 'AList',
  props: {
    /**
     * Items to render in list
     */
    items: {
      type: Array as PropType<ListItem[]>,
      default: () => [],
    },

    /**
     * Enable selecting multiple list items
     */
    multi: {
      type: Boolean,
      default: false,
    },

    /**
     * Bind v-model value to selected list item
     */
    modelValue: {
      type: [String, Number, Object],
      default: undefined,
    },

    /**
     * By default when icon props are used icon rendered at start. Use `iconAppend` to render icon at end.
     */
    iconAppend: {
      type: Boolean,
      default: false,
    },

    /**
     * By default when avatar props are used avatar is added at start. Use `avatarAppend` to render avatar at end.
     */
    avatarAppend: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const { options, select: selectListItem, value } = useGroupModel({
      options: !isEmptyArray(props.items) && props.items[0].value
        ? props.items.map(i => i.value)
        : props.items.length,
      multi: props.multi,
    })

    // const isActive = computed(() => options.value[itemIndex].isSelected)
    const handleListItemClick = (item: any) => {
      const emitValue = item.value ?? item
      emit('update:modelValue', emitValue)
      selectListItem(emitValue)
    }

    // 👉 Return
    return () => (
      <ul class="a-list grid gap-$a-list-gap" >
        {/* 👉 before slot */}
        {
        slots.before
          ? <li>
            {slots.before?.()}
          </li>
          : null
        }

        {/* 👉 List items */}
        {slots.default
          ? slots.default({ handleListItemClick })
          : props.items.map((item, index) => (
            <AListItem
              {...item}
              avatarAppend={props.avatarAppend}
              iconAppend={props.iconAppend}
              is-active={options.value[index].isSelected}
              onClick={handleListItemClick}
              v-slots={{
                prepend: slots.prepend ? () => slots.prepend?.({ item, index }) : null,
                item: slots.item ? () => slots.item?.({ item, index }) : null,
                append: slots.append ? () => slots.append?.({ item, index }) : null,
              }}
              value={props.modelValue !== undefined ? options.value[index] : undefined}
            />
          ))}

        {/* 👉 after slot */}
        {
        slots.after
          ? <li>
            {slots.after?.()}
          </li>
          : null
        }
      </ul>
    )
  },
})

export type AList = InstanceType<typeof AList>
