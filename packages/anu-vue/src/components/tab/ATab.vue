<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import type { aTabSlots } from './meta'
import { aTabProps } from './meta'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aTabProps)
defineSlots<typeof aTabSlots>()

defineOptions({
  name: 'ATab',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const breakpoints = useBreakpoints(breakpointsTailwind)
const isBpSmall = breakpoints.smaller('sm')
const shouldHideTitle = computed(() => {
  if (props.hideTitleOnMobile) {
    if (props.icon)
      return isBpSmall
  }
})
</script>

<template>
  <div
    v-bind="defaultsAttrs"
    :style="defaultsStyle"
    class="a-tab flex justify-center items-center cursor-pointer"
    :class="[
      props.disabled && 'a-tab-disabled opacity-50 pointer-events-none',
      props.stacked && 'flex-col',
      defaultsClass,
    ]"
  >
    <slot name="prepend">
      <i
        v-if="props.icon"
        :class="props.icon"
      />
    </slot>

    <p
      v-if="props.title && !shouldHideTitle"
      class="a-tab-title whitespace-nowrap"
    >
      {{ props.title }}
    </p>

    <slot name="append">
      <i
        v-if="props.appendIcon"
        :class="props.appendIcon"
      />
    </slot>
  </div>
</template>
