<script lang="ts" setup>
import type { ExtractPropTypes, PropType } from 'vue'
import type { ListItemProps } from '@/components/list-item'
import { AListItem } from '@/components/list-item'
import { useGroupModel } from '@/composables'
import { isEmptyArray } from '@/utils/helpers'

const props = defineProps({
  /**
   * Items to render in list
   */
  items: {
    type: Array as PropType<ListItemProps[]>,
    default: () => [],
  },

  /**
   * Enable selecting multiple list items
   */
  multi: Boolean,

  /**
   * Bind v-model value to selected list item
   */
  modelValue: null,

  /**
   * By default when icon props are used icon rendered at start. Use `iconAppend` to render icon at end.
   */
  iconAppend: Boolean,

  /**
   * By default when avatar props are used avatar is added at start. Use `avatarAppend` to render avatar at end.
   */
  avatarAppend: Boolean,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'AList',
})

const { options, select: selectListItem, value } = useGroupModel({
  options: !isEmptyArray(props.items) && props.items[0].value
    ? props.items.map(i => i.value)
    : props.items.length,
  multi: props.multi,
})

// const isActive = computed(() => options.value[itemIndex].isSelected)
const handleListItemClick = (item: ListItemProps, index: number) => {
  selectListItem(item.value || index)
  emit('update:modelValue', value.value)
}
</script>

<template>
  <ul class="a-list grid gap-$a-list-gap">
    <!-- 👉 Slot: before -->
    <li v-if="$slots.before">
      <slot name="before" />
    </li>

    <!-- 👉 Slot: default -->
    <slot :handle-list-item-click="handleListItemClick">
      <AListItem
        v-for="(item, index) in props.items"
        :key="index"
        v-bind="item"
        :avatar-append="props.avatarAppend"
        :icon-append="props.iconAppend"
        :is-active="options[index].isSelected as unknown as boolean"
        :value="props.modelValue !== undefined ? options[index] : undefined"
        v-on="{
          click: item.value || (props.modelValue !== undefined)
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
