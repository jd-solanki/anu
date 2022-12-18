<script lang="ts" setup>
import type { ListItemProps } from '@/components/list-item'
import { AListItem } from '@/components/list-item'
import { useGroupModel } from '@/composables'
import { isEmptyArray } from '@/utils/helpers'

type ModelValue = any

interface Props {
  items?: ListItemProps[]
  multi?: boolean
  modelValue?: ModelValue
  iconAppend?: boolean
  avatarAppend?: boolean

}

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
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
        :is-active="options[index].isSelected"
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
