<script lang="ts" setup>
import type { LayerProps } from '@/composables/useLayer'
import { useLayer } from '@/composables/useLayer'

interface Props extends LayerProps {
  modelValue?: boolean
  closable?: boolean
  icon?: string
  appendIcon?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  variant: 'light',
  modelValue: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'click:close'): void
  (e: 'click:appendIcon'): void
}>()

defineOptions({
  name: 'AChip',
})

const attrs = useAttrs()

const { getLayerClasses } = useLayer()

const isClickable = computed(() => attrs.onClick !== undefined)

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  isClickable,
)

const closeChip = () => {
  emit('update:modelValue', false)
  emit('click:close')
}
</script>

<template>
  <div
    v-if="props.modelValue"
    :style="styles"
    class="a-chip"
    :class="[
      {
        'a-chip-disabled': props.disabled,
        'cursor-pointer': isClickable,
      },
      classes,
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
