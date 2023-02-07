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
  <Transition
    name="fade"
    mode="out-in"
  >
    <i
      v-if="!props.loading"
      :class="props.icon"
    />
    <ASpinner
      v-else
      v-bind="$attrs"
    />
  </Transition>
</template>
