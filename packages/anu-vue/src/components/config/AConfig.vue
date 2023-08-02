<script lang="ts" setup>
import { mergePropsDefaults } from 'anu-vue/composables/useDefaults'
import { ANU_PROPS_DEFAULTS } from 'anu-vue/symbols'
import { aConfigProps } from './meta'

defineOptions({
  name: 'AConfig',
})
const props = defineProps(aConfigProps)
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
