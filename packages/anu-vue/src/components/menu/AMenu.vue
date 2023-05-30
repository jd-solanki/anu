<script lang="ts" setup>
import type { aMenuSlots } from './meta'
import { aMenuProps } from './meta'
import { ACard } from '@/components'
import { AFloating } from '@/components/floating'
import { useParent } from '@/composables'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aMenuProps)
defineSlots<typeof aMenuSlots>()

defineOptions({
  name: 'AMenu',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const parentEl = useParent()
</script>

<template>
  <AFloating
    v-bind="{ ...props, ...defaultsAttrs }"
    :class="defaultsClass"
    :style="defaultsStyle"
    :reference-el="parentEl"
  >
    <ACard>
      <slot />
    </ACard>
  </AFloating>
</template>
