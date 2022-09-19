import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'
import { useGroupModel } from '../../composables'
import { ATypography } from '../typography'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'

import { AAvatar, isAvatarUsed } from '@/components/avatar'
import type { AvatarOnlyProps } from '@/components/avatar/props'

// TODO: Reuse the existing props and its types. Maybe if we create AListItem component then we can reuse prop types.
interface ListItem extends AvatarOnlyProps {
  title: string | string[]
  subtitle?: string | string[]
  text: string | string[]
  src?: string
  value?: any
  disable?: boolean
  $avatar?: { string: any }

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
    items: {
      type: Array as PropType<ListItem[]>,
      required: true,
    },
    multi: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number, Object],
      default: null,
    },
    avatarAppend: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit }) {
    const { getLayerClasses } = useLayer()
    const { options, select: selectListItem, value } = useGroupModel({
      options: props.items[0].value ? props.items.map(i => i.value) : props.items.length,
      multi: props.multi,
    })
    const isAvatarPropsUsed = computed(() => {
      return isAvatarUsed(props.items[0])
    })

    // 👉 Avatar Renderer
    const avatarRenderer = (
      content: typeof props.items[number]['content'],
      src: typeof props.items[number]['src'],
      alt: typeof props.items[number]['alt'],
      icon: typeof props.items[number]['icon'],
      $avatar: typeof props.items[number]['$avatar'],
    ) => {
      const _alt = alt || 'avatar'

      return <AAvatar
        content={content}
        src={src}
        alt={_alt}
        icon={icon}
        {...$avatar}
      />
    }

    const handleListItemClick = (index: number) => {
      const itemValue = options.value[index].value
      selectListItem(itemValue)
      if (props.modelValue !== null)
        emit('update:modelValue', value.value)
    }

    // 👉 List items
    const listItems = computed(() => props.items.map((listItem, itemIndex) => {
      // ℹ️ Reduce the size of title to 1rem. We did the same in ACard as well.
      let titleProp: string[] | undefined
      if (listItem.title) {
        // if title property is string
        if (typeof listItem.title === 'string') {
          titleProp = [listItem.title, 'text-base']
        }

        // title property is array
        else {
          const [textContent, textClasses] = listItem.title
          titleProp = [textContent, `${textClasses} uno-layer-base-text-sm`]
        }
      }

      const isActive = computed(() => options.value[itemIndex].isSelected)

      const layerProps = computed(() => ({
        states: props.states,
        color: isActive.value ? props.color || 'primary' : undefined,
        variant: isActive.value ? props.variant || 'light' : 'text',
      }))

      return <li
        onClick={() => handleListItemClick(itemIndex)}
        class={[
          'a-list-item',
          { 'opacity-50 pointer-events-none': listItem.disable },
          props.modelValue !== null
            ? [...getLayerClasses(layerProps.value, { statesClass: 'states:10' }), 'cursor-pointer']
            : '',
          'flex items-center gap-$a-list-item-gap m-$a-list-item-margin p-$a-list-item-padding min-h-$a-list-item-min-height',
        ]}>
          {
            slots.prepend
              ? slots.prepend({ listItem, itemIndex })
              : isAvatarPropsUsed.value && !props.avatarAppend
                ? avatarRenderer(listItem.content, listItem.src, listItem.alt, listItem.icon, listItem.$avatar)
                : null
          }
          <ATypography class="flex-grow" title={titleProp} subtitle={listItem.subtitle} text={listItem.text}></ATypography>
          {
            slots.append
              ? slots.append({ listItem, itemIndex })
              : isAvatarPropsUsed.value && props.avatarAppend
                ? avatarRenderer(listItem.content, listItem.src, listItem.alt, listItem.icon, listItem.$avatar)
                : null
          }
      </li>
    }))

    // 👉 Return
    return () => <ul class="a-list grid gap-$a-list-gap">
        {/* 👉 before slot */}
        {
          slots.before
            ? <li>{slots.before?.()}</li>
            : null
        }

        {/* 👉 List items */}
        {slots.default ? slots.default() : listItems.value}

        {/* 👉 after slot */}
        {
          slots.after
            ? <li>{slots.after?.()}</li>
            : null
        }
    </ul>
  },
})

export type AList = InstanceType<typeof AList>
