<script lang="ts" setup>
import type { aMenuSlots } from './meta'
import { aMenuProps } from './meta'
import { ACard } from 'anu-vue/components'
import { AFloating } from 'anu-vue/components/floating'
import { useParent } from 'anu-vue/composables'
import { useDefaults } from 'anu-vue/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aMenuProps)

defineOptions({
  name: 'AMenu',
})

defineSlots<typeof aMenuSlots>()

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
