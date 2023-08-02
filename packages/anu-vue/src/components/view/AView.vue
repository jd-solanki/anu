<script lang="ts" setup>
import { ViewGroupModel } from 'anu-vue/components/views/symbol'
import { useDefaults } from 'anu-vue/composables/useDefaults'
import { aViewProps } from './meta'

defineOptions({
  name: 'AView',
})

// SECTION Meta
const _props = defineProps(aViewProps)

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
