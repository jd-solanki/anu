<script lang="ts" setup>
import { aViewProps } from './meta'
import { ViewGroupModel } from '@/components/views/symbol'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aViewProps)

defineOptions({
  name: 'AView',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION
// Inject `ActiveViewSymbol` so we can update active view
const groupModel = inject(ViewGroupModel)

// If group model is not provided, throw error
if (!groupModel)
  throw new Error('AView must be used inside AViews')
</script>

<template>
  <!-- TODO: Fix type -->
  <div
    v-show="(groupModel.value as any).value === props.value"
    v-bind="defaultsAttrs"
    class="a-view w-full transform"
    :class="defaultsClass"
    :style="defaultsStyle"
  >
    <slot />
  </div>
</template>
