<script lang="ts" setup>
import type { aTooltipSlots } from './meta'
import { aTooltipProps } from './meta'
import { AFloating } from '@/components/floating'
import { useParent } from '@/composables'

// import { arrow } from '@floating-ui/vue'

const props = defineProps(aTooltipProps)
defineSlots<typeof aTooltipSlots>()

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
