<script lang="ts" setup>
// import { arrow } from '@floating-ui/vue'
import { tooltipProps } from './props'
import { AFloating } from '@/components/floating'
import { useParent } from '@/composables'

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

const parentEl = useParent()

// const arrowEl = ref()
</script>

<template>
  <AFloating
    v-bind="props"
    :reference-el="parentEl"
    class="a-tooltip-wrapper"
  >
    <div class="a-tooltip">
      <span class="a-tooltip-text">
        <slot>
          {{ props.text }}
        </slot>
      </span>
      <!-- <div
        ref="arrowEl"
        class="a-tooltip-arrow absolute"
      /> -->
    </div>
  </AFloating>
</template>
