<script lang="ts" setup>
import { menuProps } from './props'
import { ACard } from '@/components'
import { AFloating } from '@/components/floating'
import { useParentEl } from '@/composables'

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

const { parentEL } = useParentEl()
</script>

<template>
  <AFloating
    v-bind="props"
    :reference-el="parentEL"
  >
    <ACard>
      <slot />
    </ACard>
  </AFloating>
</template>
