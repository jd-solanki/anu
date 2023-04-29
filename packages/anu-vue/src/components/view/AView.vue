<script lang="ts" setup>
import { aViewProps } from './meta'
import { ViewGroupModel } from '@/components/views/symbol'

const props = defineProps(aViewProps)

defineOptions({
  name: 'AView',
})

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
    class="a-view w-full transform"
  >
    <slot />
  </div>
</template>
