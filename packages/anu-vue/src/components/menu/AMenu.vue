<script lang="ts" setup>
import { menuProps } from './props'
import { ACard } from '@/components'
import { AFloating } from '@/components/floating'
import { useParentEl } from '@/composables'

const props = defineProps(menuProps)

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
