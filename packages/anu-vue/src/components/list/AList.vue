<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import type { ListPropItems } from './props'
import { listProps } from './props'
import type { listSlots } from './slots'
import { listItemSlot } from './slots'
import { isObject } from '@/utils/helpers'
import { useGroupModel } from '@/composables'
import { AListItem } from '@/components/list-item'

const props = defineProps(listProps)

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void

  // ℹ️ Fix type => (e: 'click:item', value: (ExtractPropTypes<typeof props>)['items'][number]): void
  (e: 'click:item', value: { item: ListPropItems[number]; value: any }): void
}>()

defineOptions({
  name: 'AList',
})

defineSlots<typeof listSlots>()

const extractItemValueFromItemOption = (item: ListPropItems[number]) => isObject(item) ? (item.value || item) : item

const { options, select: selectListItem, value } = useGroupModel({
  options: props.items.map(i => extractItemValueFromItemOption(i)),
  multi: props.multi,
})

// const isActive = computed(() => options.value[itemIndex].isSelected)
const handleListItemClick = (item: ListPropItems[number]) => {
  selectListItem(extractItemValueFromItemOption(item))
  emit('update:modelValue', value.value)
  emit('click:item', {
    value: value.value,
    item,
  })
}
</script>

<template>
  <ul class="a-list grid">
    <!-- 👉 Slot: before -->
    <li v-if="$slots.before">
      <slot name="before" />
    </li>

    <!-- 👉 Slot: default -->
    <slot :handle-list-item-click="handleListItemClick">
      <AListItem
        v-for="(item, index) in props.items"
        :key="index"
        :text="typeof item === 'string' || typeof item === 'number' ? item : undefined"
        v-bind="typeof item === 'string' ? {} : item"
        :avatar-append="props.avatarAppend"
        :icon-append="props.iconAppend"
        :is-active="options[index].isSelected as unknown as boolean"
        :value="props.modelValue !== undefined ? options[index] : undefined"
        v-on="{
          click: props['onClick:item'] || (props.modelValue !== undefined)
            ? () => handleListItemClick(item)
            : null,
        }"
      >
        <!-- ℹ️ Recursively pass down slots to child -->
        <template
          v-for="name in Object.keys(listItemSlot)"
          #[name]="slotProps"
        >
          <!-- ℹ️ v-if condition will omit passing slots. Here, we don't want to pass default slot. -->
          <slot
            :name="name"
            :index="index"
            v-bind="slotProps || {}"
          />
        </template>
      </AListItem>
    </slot>
    <li v-if="$slots.after">
      <slot name="after" />
    </li>
  </ul>
</template>
