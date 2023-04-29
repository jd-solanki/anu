<script lang="ts" setup>
import type { aMenuSlots } from './meta'
import { aMenuProps } from './meta'
import { ACard } from '@/components'
import { AFloating } from '@/components/floating'
import { useParent } from '@/composables'

const props = defineProps(aMenuProps)
defineSlots<typeof aMenuSlots>()

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
