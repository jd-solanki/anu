<script lang="ts" setup>
import { ASpinner } from 'anu-vue/components'
import { useDefaults } from 'anu-vue/composables/useDefaults'
import { aLoadingIconProps } from './meta'

defineOptions({
  name: 'ALoadingIcon',
  inheritAttrs: false,
})

// SECTION Meta
const _props = defineProps(aLoadingIconProps)

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
