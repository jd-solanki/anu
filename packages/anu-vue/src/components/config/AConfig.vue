<script lang="ts" setup>
import { aConfigProps } from './meta'
import { mergePropsDefaults } from '@/composables/useDefaults'
import { ANU_PROPS_DEFAULTS } from '@/symbols'

const props = defineProps(aConfigProps)
defineOptions({
  name: 'AConfig',
})

const defaults = inject(ANU_PROPS_DEFAULTS)

// ℹ️ Pass new reactive value to avoid updates in upward tree
provide(
  ANU_PROPS_DEFAULTS,
  computed(() => mergePropsDefaults(defaults, props.props)),
)
</script>

<template>
  <slot />
</template>
