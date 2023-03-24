<script lang="ts" setup>
import { ViewGroupModel } from '@/components/views/symbol'

const props = defineProps({
  value: {
    type: Number,
    default: undefined,
  },
})

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
  <div
    v-show="groupModel.value.value === props.value"
    class="a-view"
    :data-active="groupModel.value.value === props.value"
    :data-current="groupModel.value.value"
  >
    <slot />
  </div>
</template>
