<script lang="ts" setup>
import type { VNode } from 'vue'
import { h } from 'vue'
import { ActiveViewSymbol, ViewGroupModel } from './symbol'
import { useGroupModel } from '@/composables'
import { AView } from '@/components/view'

const props = defineProps({
  /**
   * Active view value
   */
  modelValue: {
    type: null,
    default: 0,
  },
})

defineOptions({
  name: 'AViews',
})

const slots = useSlots()

// TODO: Auto calculate `AView` based on used slots
console.log('slots :>> ', slots)

let childViews: VNode[] = []
if (slots.default)
  childViews = slots.default()?.filter(vnode => vnode.type === AView) || []

const activeTab = ref(0)
const groupModel = useGroupModel({
  options: childViews.length,
})
groupModel.select(props.modelValue)
watch(() => props.modelValue, value => groupModel.select(value))

console.log('activeView :>> ', groupModel.value)
console.log('viewOptions :>> ', groupModel.options.value)

// ℹ️ Inject active tab so we don't have to use `v-model` on `ATabs` and `AViews`
provide(ActiveViewSymbol, activeTab)
provide(ViewGroupModel, groupModel)

console.log('views :>> ', childViews)
</script>

<template>
  <div class="a-views">
    <p>Active: {{ groupModel.value }}</p>
    <template
      v-for="(view, index) in childViews"
      :key="index"
    >
      <slot :name="index">
        <component :is="h(view, { value: index })" />
      </slot>
    </template>
  </div>
</template>
