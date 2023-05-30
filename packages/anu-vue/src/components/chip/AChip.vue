<script lang="ts" setup>
import type { AChipEvents, aChipSlots } from './meta'
import { aChipProps } from './meta'
import { useDefaults } from '@/composables/useDefaults'
import { useLayer } from '@/composables/useLayer'

// SECTION Meta
const _props = defineProps(aChipProps)
const emit = defineEmits<AChipEvents>()
defineSlots<typeof aChipSlots>()

defineOptions({
  name: 'AChip',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION
const attrs = useAttrs()

const { getLayerClasses } = useLayer()

const isClickable = computed(() => attrs.onClick !== undefined)

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  isClickable,
)

function closeChip() {
  emit('update:modelValue', false)
  emit('click:close')
}
</script>

<template>
  <div
    v-if="props.modelValue"
    v-bind="defaultsAttrs"
    :style="[styles, defaultsStyle]"
    class="a-chip"
    :class="[
      {
        'a-chip-disabled': props.disabled,
        'cursor-pointer': isClickable,
      },
      classes,
      defaultsClass,
    ]"
  >
    <!-- Prepend icon -->
    <i
      v-if="props.icon"
      :class="props.icon"
    />

    <!-- Default slot -->
    <slot />

    <!-- Append icon -->
    <i
      v-if="props.appendIcon"
      :class="props.appendIcon"
    />

    <!-- Close icon -->
    <i
      v-if="props.closable"
      class="i-bx-x hover:i-bx-bxs-x-circle hover:opacity-70"
      @click="closeChip"
    />
  </div>
</template>
