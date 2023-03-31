<script lang="ts" setup>
import { menuProps } from './props'
import { ACard } from '@/components'
import { AFloating } from '@/components/floating'
import { useParent } from '@/composables'

const props = defineProps(menuProps)

defineSlots<{

  /**
   * Default slot for rendering menu content
   * Generally, you will use `AList` component here.
   */
  default: {}
}>()

defineOptions({
  name: 'AMenu',
})

const parentEl = useParent()
</script>

<template>
  <AFloating
    v-bind="props"
    :reference-el="parentEl"
  >
    <ACard>
      <slot />
    </ACard>
  </AFloating>
</template>
