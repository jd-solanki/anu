<script lang="ts" setup>
import { aLoadingIconProps } from './meta'
import { ASpinner } from '@/components'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aLoadingIconProps)

defineOptions({
  name: 'ALoadingIcon',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION
</script>

<template>
  <ASpinner
    v-if="props.loading"
    class="transition-opacity"
    :class="defaultsClass"
    :style="defaultsStyle"
    v-bind="{ ...$attrs, ...defaultsAttrs }"
  />
  <i
    v-else
    :class="props.icon"
  />
</template>
