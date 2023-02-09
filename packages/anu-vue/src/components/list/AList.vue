<script lang="ts" setup>
import type { ExtractPropTypes, PropType } from 'vue'
import type { ListItemProps } from '@/components/list-item'
import { AListItem } from '@/components/list-item'
import { useGroupModel } from '@/composables'
import { spacing as spacingProp } from '@/composables/useProps'
import { useSpacing } from '@/composables/useSpacing'

type ListItem = ListItemProps | string

const props = defineProps({
  /**
   * Items to render in list
   */
  'items': {
    type: Array as PropType<ListItem[]>,
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

  /**
   * By default when icon props are used icon rendered at start. Use `iconAppend` to render icon at end.
   */
  'iconAppend': Boolean,

  /**
   * By default when avatar props are used avatar is added at start. Use `avatarAppend` to render avatar at end.
   */
  'avatarAppend': Boolean,

  // ℹ️ Workaround for checking if event is present on component instance: https://github.com/vuejs/core/issues/5220#issuecomment-1007488240
  'onClick:item': Function,

  'spacing': spacingProp,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void

  // ℹ️ Fix type => (e: 'click:item', value: (ExtractPropTypes<typeof props>)['items'][number]): void
  (e: 'click:item', value: { index: number; item: ListItem; value: any }): void
}>()

defineOptions({
  name: 'AList',
})

const spacing = useSpacing(toRef(props, 'spacing'))

const extractItemValueFromItemOption = (item: ListItem) => typeof item === 'string' ? item : (item.value || item)

const { options, select: selectListItem, value } = useGroupModel({
  options: props.items.map(i => extractItemValueFromItemOption(i)),
  multi: props.multi,
})

// const isActive = computed(() => options.value[itemIndex].isSelected)
const handleListItemClick = (item: ListItem, index: number) => {
  selectListItem(extractItemValueFromItemOption(item) || index)
  emit('update:modelValue', value.value)
  emit('click:item', {
    index,
    item,
    value: value.value,
  })
}
</script>

<template>
  <ul
    class="a-list grid gap-$a-list-gap"
    :style="[{ '--a-spacing': spacing / 100 }]"
  >
    <!-- 👉 Slot: before -->
    <li v-if="$slots.before">
      <slot name="before" />
    </li>

    <!-- 👉 Slot: default -->
    <slot :handle-list-item-click="handleListItemClick">
      <AListItem
        v-for="(item, index) in props.items"
        :key="index"
        :text="typeof item === 'string' ? item : undefined"
        v-bind="typeof item === 'string' ? {} : item"
        :avatar-append="props.avatarAppend"
        :icon-append="props.iconAppend"
        :is-active="options[index].isSelected as unknown as boolean"
        :value="props.modelValue !== undefined ? options[index] : undefined"
        v-on="{
          click: props['onClick:item'] || (props.modelValue !== undefined)
            ? () => handleListItemClick(item, index)
            : null,
        }"
      >
        <!-- 👉 Slot: prepend -->
        <slot
          name="prepend"
          :item="item"
          :index="index"
        />

        <!-- 👉 Slot: item -->
        <slot
          name="item"
          :item="item"
          :index="index"
        />

        <!-- 👉 Slot: append -->
        <slot
          name="append"
          :item="item"
          :index="index"
        />
      </AListItem>
    </slot>
    <li v-if="$slots.after">
      <slot name="after" />
    </li>
  </ul>
</template>
