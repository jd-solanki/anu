<script lang="ts" setup>
import type { Middleware } from '@floating-ui/vue'

// import { arrow } from '@floating-ui/vue'
import { flip, offset, shift } from '@floating-ui/vue'
import { tooltipProps } from './props'
import { AFloating } from '@/components/floating'

const props = defineProps(tooltipProps)

defineSlots<{

  /**
   * Default slot for rendering tooltip content. If default slot is used `text` prop will be discarded.
   */
  default: {}
}>()

defineOptions({
  name: 'ATooltip',
})

const parentEl = useParentElement()

// const arrowEl = ref()

const floatingMiddleware = [
  offset(10),
  flip(),
  shift({ padding: 10 }),

  // arrow({
  //   element: arrowEl,
  // }),
] as Middleware[]
</script>

<template>
  <AFloating
    v-bind="props"
    :reference-el="parentEl"
    class="a-tooltip-wrapper"
    :middleware="() => floatingMiddleware"
  >
    <div class="a-tooltip">
      <slot>
        <span class="a-tooltip-text">{{ props.text }}</span>
      </slot>
      <!-- <div
        ref="arrowEl"
        class="a-tooltip-arrow absolute"
      /> -->
    </div>
  </AFloating>
</template>
