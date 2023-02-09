<script lang="ts" setup>
import { menuProps } from './props'
import { ACard } from '@/components'
import { AFloating } from '@/components/floating'

const props = defineProps(menuProps)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineOptions({
  name: 'AMenu',
})

const refReference = ref()
onMounted(() => {
  const vm = getCurrentInstance()
  if (vm?.proxy?.$parent)
    refReference.value = vm?.proxy?.$parent.$el
})
</script>

<template>
  <AFloating
    v-bind="props"
    :reference-el="refReference"
  >
    <ACard>
      <slot />
    </ACard>
  </AFloating>
</template>
