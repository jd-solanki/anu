<script lang="ts" setup>
import type { AListEvents, AListPropItems, aListSlots } from './meta'
import { aListListItemSlotsWithPrefixMeta, aListProps } from './meta'
import { AListItem } from '@/components/list-item'
import { calculateSelectionItems, extractItemValueFromItemOption, useSelection } from '@/composables/useSelection'

const props = defineProps(aListProps)
const emit = defineEmits<AListEvents>()
defineSlots<typeof aListSlots>()

defineOptions({
  name: 'AList',
})

const { options, select: selectListItem, value } = useSelection({
  items: calculateSelectionItems(toRef(() => props.items)),
  multi: toRef(() => props.multi),
  initialValue: toRef(() => props.modelValue),
})

// const isActive = computed(() => options.value[itemIndex].isSelected)
function handleListItemClick(item: AListPropItems[number]) {
  console.log('object', item, props['onClick:item'])
  selectListItem(extractItemValueFromItemOption(item))
  emit('update:modelValue', value.value)

  // ℹ️ This even is not triggered because we use accepting `onClick:item` as a prop
  // emit('click:item', { value: value.value })
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
        :color="props.color"
        :variant="props.variant"
        :states="props.states"
        :is-active="options[index]?.isSelected as unknown as boolean"
        :value="props.modelValue !== undefined ? options[index] : undefined"
        v-on="{
          click: props['onClick:item'] || (props.modelValue !== undefined)
            ? () => {
              console.log('cliked');
              handleListItemClick(item)
            }
            : null,
        }"
      >
        <!-- ℹ️ Recursively pass down slots to child -->
        <template
          v-for="{ originalKey: originalSlotName, prefixedKey: updatedSlotName } in aListListItemSlotsWithPrefixMeta"
          #[originalSlotName]="slotProps"
        >
          <slot
            :name="updatedSlotName"
            :index="index"
            v-bind="slotProps"
          />
        </template>
      </AListItem>
    </slot>
    <li v-if="$slots.after">
      <slot name="after" />
    </li>
  </ul>
</template>
