<script lang="ts" setup>
import { ASpinner } from '@/components'
import { configurable as configurableProp } from '@/composables/useProps'

const props = defineProps({
  icon: configurableProp,

  /**
   * Set loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
})

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
