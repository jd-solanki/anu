<script lang="ts" setup>
import type { aTooltipSlots } from './meta'
import { aTooltipProps } from './meta'
import { AFloating } from '@/components/floating'
import { useParent } from '@/composables'
import { useDefaults } from '@/composables/useDefaults'

// import { arrow } from '@floating-ui/vue'

// SECTION Meta
const _props = defineProps(aTooltipProps)
defineSlots<typeof aTooltipSlots>()

defineOptions({
  name: 'ATooltip',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const parentEl = useParent()

// const arrowEl = ref()
</script>

<template>
  <AFloating
    v-bind="{ ...props, ...defaultsAttrs }"
    :reference-el="parentEl"
    class="a-tooltip-wrapper"
    :class="defaultsClass"
    :style="defaultsStyle"
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
