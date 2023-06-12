<script lang="ts" setup>
import { mergePropsDefaults } from '@/composables/useDefaults';
import { ANU_DEFAULTS } from '@/symbols';
import { aConfigProps } from './meta';

const props = defineProps(aConfigProps)
defineOptions({
  name: 'AConfig',
})

const defaults = inject(ANU_DEFAULTS)

const result = computed(() => mergePropsDefaults(defaults, props.props))

// watch(
//   () => props.props,
//   () => {
//     provide(ANU_DEFAULTS, result)
//   },
//   { immediate: true },
// )
provide(ANU_DEFAULTS, result)
</script>

<template>
  <slot />
</template>
