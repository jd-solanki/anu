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

  /**
   * Transition to use
   */
  transition: {
    type: String,
    default: 'fade',
  },
})

defineOptions({
  name: 'AViews',
})

const slots = useSlots()

// TODO: Auto calculate `AView` based on used slots

let childViews: VNode[] = []
if (slots.default)
  childViews = slots.default()?.filter(vnode => vnode.type === AView) || []

const isValuePropUsedByView = childViews.some(vnode => vnode.props && vnode.props.value)

const activeTab = ref(0)
const groupModel = useGroupModel({
  options: isValuePropUsedByView ? childViews.map(vnode => vnode.props && vnode.props.value) : childViews.length,
})
groupModel.select(props.modelValue)
watch(() => props.modelValue, value => groupModel.select(value))

// ℹ️ Inject active tab so we don't have to use `v-model` on `ATabs` and `AViews`
provide(ActiveViewSymbol, activeTab)
provide(ViewGroupModel, groupModel)
</script>

<template>
  <div class="a-views overflow-hidden">
    <TransitionGroup
      tag="div"
      :class="`${props.transition}-group`"
      class="relative"
      :name="props.transition"
    >
      <slot>
        <template
          v-for="(view, index) in childViews"
          :key="index"
        >
          <slot :name="index">
            <component :is="h(view, { value: index })" />
          </slot>
        </template>
      </slot>
    </TransitionGroup>
  </div>
</template>
