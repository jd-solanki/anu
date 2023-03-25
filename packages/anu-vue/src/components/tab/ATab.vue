<script lang="ts" setup>
import { tabProps } from './props'

const props = defineProps(tabProps)

defineOptions({
  name: 'ATab',
})
</script>

<template>
  <div
    class="a-tab flex justify-center items-center cursor-pointer"
    :class="[
      props.disabled && 'a-tab-disabled opacity-50 pointer-events-none',
      props.stacked && 'flex-col',
    ]"
  >
    <slot name="prepend">
      <i
        v-if="props.icon"
        :class="props.icon"
      />
    </slot>

    <p
      v-if="props.title"
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
