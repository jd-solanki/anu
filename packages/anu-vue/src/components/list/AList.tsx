import type { PropType } from 'vue'
import { computed, defineComponent, toRef } from 'vue'
import { useGroupModel } from '../../composables'
import { ATypography } from '../typography'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'

import { AAvatar } from '@/components/avatar'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { useConfigurable } from '@/composables/useConfigurable'
import { isEmptyArray } from '@/utils/helpers'

// TODO: Reuse the existing props and its types. Maybe if we create AListItem component then we can reuse prop types.
interface ListItem {
  title: ConfigurableValue
  subtitle?: ConfigurableValue
  text: ConfigurableValue
  value?: any
  disable?: boolean
  icon?: string

  // TODO: Improve typing
  $avatar?: any

  // color: 'primary' | 'success' | 'info' | 'warning' | 'danger'
  // variant: 'fill' | 'outline' | 'light' | 'text'
  // states?: boolean
}

export const AList = defineComponent({
  name: 'AList',
  props: {
    ...useLayerProps({
      variant: {
        default: 'text',
      },
      states: {
        default: true,
      },
    }),

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
     * By default when avatar props are used avatar is added at start. Use `avatarAppend` to render avatar at end.
     */
    avatarAppend: {
      type: Boolean,
      default: false,
    },

    /**
     * By default when icon props are used icon rendered at start. Use `iconAppend` to render icon at end.
     */
    iconAppend: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'click:icon', 'click:iconAppend', 'click:avatar', 'click:avatarAppend'],
  setup(props, { slots, emit }) {
    // 👉 List items
    const listItems = computed(() => {
      // useGroupModel
      const { options, select: selectListItem, value } = useGroupModel({
        options: !isEmptyArray(props.items) && props.items[0].value
          ? props.items.map(i => i.value)
          : props.items.length,
        multi: props.multi,
      })

      // useLayer
      const { getLayerClasses } = useLayer()

      // Handle list item click
      const handleListItemClick = (index: number) => {
        const itemValue = options.value[index].value
        selectListItem(itemValue)
        if (props.modelValue !== undefined)
          emit('update:modelValue', value.value)
      }

      // 👉 List item markup
      return props.items.map((listItem, itemIndex) => {
        // ℹ️ Reduce the size of title to 1rem. We did the same in ACard as well.
        const _titleProp = useConfigurable(listItem.title)
        if (Array.isArray(_titleProp.value.classes))
          _titleProp.value.classes = [..._titleProp.value.classes, 'uno-layer-base-text-base']
        else
          _titleProp.value.classes += ' uno-layer-base-text-base'

        const isActive = computed(() => options.value[itemIndex].isSelected)

        // const [style, classes] = getLayerClasses(layerProps.value, { statesClass: 'states:10' })
        const { styles, classes } = getLayerClasses(
          computed(() => isActive.value ? props.color || 'primary' : undefined),
          computed(() => isActive.value ? props.variant || 'light' : 'text'),
          toRef(props, 'states'),
          { statesClass: 'states:10' },
        )

        return (
          <li
            class={[
              'a-list-item',
              { 'opacity-50 pointer-events-none': listItem.disable },
              props.modelValue !== undefined
                ? [...classes.value, 'cursor-pointer']
                : '',
              'flex items-center gap-$a-list-item-gap m-$a-list-item-margin p-$a-list-item-padding min-h-$a-list-item-min-height',
            ]}
            onClick={() => handleListItemClick(itemIndex)}
            style={[...styles.value]}
          >

            {/* 👉 Slot: prepend */}
            {

              // If prepend slot is used => Use it
              slots.prepend
                ? slots.prepend({ listItem, itemIndex })

                // If icon prop is provided and should be prepended => Render icon
                : listItem.icon && !props.iconAppend
                  ? <i
                      class={['uno-layer-base-text-xl', listItem.icon]}
                      onClick={() => emit('click:icon')}
                    />

                  // If avatar props are provided/used & should be prepended => Render avatar
                  : listItem.$avatar && !props.avatarAppend
                    ? <AAvatar
                        onClick={() => emit('click:avatar')}
                        {...listItem.$avatar}
                      />

                    // If nothing is truthy => Don't render anything
                    : null
            }

            {/* Slot: item */}
            {
              slots.item
                ? slots.item({
                  item: listItem,
                  index: itemIndex,
                })
                : <ATypography
                    class="flex-grow"
                    subtitle={listItem.subtitle}
                    text={listItem.text}
                    title={Object.values(_titleProp.value) as ConfigurableValue}
                  />
            }

            {/* 👉 Slot: append */}
            {

              // If append slot is used => Use it
              slots.append
                ? slots.append({ listItem, itemIndex })

                // If icon prop is provided and should be appended => Render icon
                : listItem.icon && props.iconAppend
                  ? <i
                      class={['uno-layer-base-text-xl', listItem.icon]}
                      onClick={() => emit('click:iconAppend')}
                    />

                  // If avatar props are provided/used & should be appended => Render avatar
                  : listItem.$avatar && props.avatarAppend
                    ? <AAvatar
                        onClick={() => emit('click:avatarAppend')}
                        {...listItem.$avatar}
                      />

                    // If nothing is truthy => Don't render anything
                    : null
            }
          </li>
        )
      })
    })

    // 👉 Return
    return () => <ul class="a-list grid gap-$a-list-gap">
      {/* 👉 before slot */}
      {
        slots.before
          ? <li>
            {slots.before?.()}
          </li>
          : null
        }

      {/* 👉 List items */}
      {slots.default ? slots.default() : listItems.value}

      {/* 👉 after slot */}
      {
        slots.after
          ? <li>
            {slots.after?.()}
          </li>
          : null
        }
    </ul>
  },
})

export type AList = InstanceType<typeof AList>
