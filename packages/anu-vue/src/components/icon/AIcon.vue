<script lang="ts" setup>
import { aIconProps } from './meta'
import { useColor } from '@/composables'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aIconProps)

defineOptions({
  name: 'AIcon',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION
const { styles } = useColor(toRef(props, 'color'), 'icon-color')
</script>

<template>
  <button
    type="button"
    :style="styles"
    class="a-icon-btn relative rounded-full aspect-square leading-0 m--1 focus:after:opacity-35 focus:after:scale-125 focus:outline-none after:content-empty after:absolute after:inset-0 after:opacity-0 after:transform after:transition-all isolate after:z--1 after:rounded-inherit after:border-3 after:border-solid after:border-color-current"
  >
    <i
      aria-hidden="true"
      class="m-1"
      :style="defaultsStyle"
      :class="[props.icon, defaultsClass]"
      v-bind="{ ...$attrs, ...defaultsAttrs }"
    />
  </button>
</template>
