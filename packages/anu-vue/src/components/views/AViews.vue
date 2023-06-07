<script lang="ts" setup>
import type { VNode } from 'vue'
import { TransitionGroup, h } from 'vue'
import type { AViewsEvents } from './meta'
import { aViewsProps } from './meta'
import { ActiveViewSymbol, ViewGroupModel } from './symbol'
import { numRange } from '@/utils/helpers'
import { useDefaults } from '@/composables/useDefaults'
import { useSelection } from '@/composables'
import { AView } from '@/components/view'

// SECTION Meta
const _props = defineProps(aViewsProps)
const emit = defineEmits<AViewsEvents>()

defineOptions({
  name: 'AViews',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const slots = useSlots()

// TODO: Auto calculate `AView` based on used slots

let childViews: VNode[] = []
if (slots.default)
  childViews = slots.default()?.filter(vnode => vnode.type === AView) || []

const isValuePropUsedByView = childViews.some(vnode => vnode.props && vnode.props.value)

const activeTab = ref(0)
const groupModel = useSelection({
  items: isValuePropUsedByView ? childViews.map(vnode => vnode.props && vnode.props.value) : numRange(childViews.length),
})
groupModel.select(props.modelValue)
watch(() => props.modelValue, value => groupModel.select(value))

// ℹ️ Inject active tab so we don't have to use `v-model` on `ATabs` and `AViews`
provide(ActiveViewSymbol, activeTab)
provide(ViewGroupModel, groupModel)

// Swipe
const refViews = ref()
const { direction } = useSwipe(refViews)
watch(direction, value => {
  if (value)
    emit('swipe', value)
})
</script>

<template>
  <div
    v-bind="defaultsAttrs"
    ref="refViews"
    class="a-views overflow-hidden"
    :class="defaultsClass"
    :style="defaultsStyle"
  >
    <Component
      :is="props.transition ? TransitionGroup : 'div'"
      :class="props.transition && `${props.transition}-group`"
      class="a-views-wrapper relative"
      v-bind="props.transition && { tag: 'div', name: props.transition || undefined }"
    >
      <slot>
        <template
          v-for="(view, index) in childViews"
          :key="index"
        >
          <slot :name="index">
            <Component :is="h(view, { value: index })" />
          </slot>
        </template>
      </slot>
    </Component>
  </div>
</template>
