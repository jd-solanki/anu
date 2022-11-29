import type { PropType } from 'vue'
import { computed, defineComponent, getCurrentInstance, toRef } from 'vue'
import { ATypography } from '../typography'
import { AAvatar } from '@/components/avatar'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { useConfigurable } from '@/composables/useConfigurable'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { useTypographyProps } from '@/composables/useTypography'

export const AListItem = defineComponent({
  name: 'AListItem',
  props: {
    ...useTypographyProps(),
    value: {
      required: false,
    },

    /**
     * List item icon
     */
    icon: {
      type: String,
      default: undefined,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    avatarProps: {
      type: Object as PropType<any>,
      default: undefined,
    },
    ...useLayerProps({
      variant: {
        default: 'text',
      },
      states: {
        default: true,
      },
    }),

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

    /**
     * Set the active state of list item
    */
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['click', 'click:icon', 'click:avatar', 'click:iconAppend', 'click:avatarAppend'],
  setup(props, { slots, emit }) {
    const { getLayerClasses } = useLayer()

    // ℹ️ Reduce the size of title to 1rem. We did the same in ACard as well.
    const _titleProp = useConfigurable(props.title)
    if (Array.isArray(_titleProp.value.classes))
      _titleProp.value.classes = [..._titleProp.value.classes, 'uno-layer-base-text-base']
    else
      _titleProp.value.classes += ' uno-layer-base-text-base'

    // Handle list item click
    const handleListItemClick = () => {
      emit('click', props.value)
    }

    // useLayer
    const { styles, classes } = getLayerClasses(
      computed(() => props.isActive ? props.color || 'primary' : undefined),
      computed(() => props.isActive ? props.variant || 'light' : 'text'),
      toRef(props, 'states'),
      { statesClass: 'states:10' },
    )

    return () => {
      return (
        <li
          class={[
            'a-list-item',
            { 'opacity-50 pointer-events-none': props.disable },
            props.value !== undefined || !!getCurrentInstance()?.vnode.props?.onClick
              ? [...classes.value, 'cursor-pointer']
              : '',
            'flex items-center gap-$a-list-item-gap m-$a-list-item-margin p-$a-list-item-padding min-h-$a-list-item-min-height',
          ]}
          data-color={props.color}
          onClick={handleListItemClick}
          style={[...styles.value]}
        >
          {/* 👉 Slot: prepend */}
          {

              // If prepend slot is used => Use it
              slots.prepend
                ? slots.prepend()

                // If icon prop is provided and should be prepended => Render icon
                : props.icon && !props.iconAppend
                  ? <i
                      class={['uno-layer-base-text-xl', props.icon]}
                      onClick={() => emit('click:icon')}
                    />

                  // If avatar props are provided/used & should be prepended => Render avatar
                  : props.avatarProps && !props.avatarAppend
                    ? <AAvatar
                        onClick={() => emit('click:avatar')}
                        {...props.avatarProps}
                      />

                    // If nothing is truthy => Don't render anything
                    : null
            }

          {/* Slot: item */}
          {
              slots.item
                ? slots.item()
                : <ATypography
                    class="flex-grow"
                    subtitle={props.subtitle}
                    text={props.text}
                    title={props.title ? Object.values(_titleProp.value) as ConfigurableValue : undefined}
                  />
            }

          {/* 👉 Slot: append */}
          {

              // If append slot is used => Use it
              slots.append
                ? slots.append()

                // If icon prop is provided and should be appended => Render icon
                : props.icon && props.iconAppend
                  ? <i
                      class={['uno-layer-base-text-xl', props.icon]}
                      onClick={() => emit('click:iconAppend')}
                    />

                  // If avatar props are provided/used & should be appended => Render avatar
                  : props.avatarProps && props.avatarAppend
                    ? <AAvatar
                        onClick={() => emit('click:avatarAppend')}
                        {...props.avatarProps}
                      />

                    // If nothing is truthy => Don't render anything
                    : null
            }
        </li>
      )
    }
  },
})

export type AListItem = InstanceType<typeof AListItem>
