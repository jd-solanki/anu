<script lang="ts" setup>
import { aLoadingIconProps } from './meta'
import { ASpinner } from '@/components'

const props = defineProps(aLoadingIconProps)

defineOptions({
  name: 'ALoadingIcon',
  inheritAttrs: false,
})
</script>

<template>
  <ASpinner
    v-if="props.loading"
    class="transition-opacity"
    v-bind="$attrs"
  />
  <i
    v-else
    :class="props.icon"
  />
</template>
