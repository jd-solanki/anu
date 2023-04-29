<script lang="ts" setup>
import type { aBtnSlots } from './meta'
import { aBtnProps } from './meta'
import { ASpinner } from '@/components/spinner'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(aBtnProps)
defineSlots<typeof aBtnSlots>()

defineOptions({
  name: 'ABtn',
})

const { getLayerClasses } = useLayer()

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)
</script>

<template>
  <button
    :tabindex="props.disabled ? -1 : 0"
    :style="styles"
    class="inline-flex whitespace-nowrap justify-center items-center relative"
    :class="[
      props.iconOnly ? 'a-btn-icon-only' : 'a-btn',
      props.disabled && 'opacity-50 pointer-events-none',
      classes,
    ]"
    :disabled="props.disabled ? true : undefined"
  >
    <!-- ℹ️ Don't render spinner if not using loading -->
    <ASpinner
      v-if="typeof props.loading === 'boolean'"
      class="absolute"
      :class="[!props.loading && 'opacity-0']"
    />
    <div
      class="a-btn-content"
      data-no-reference
      :class="[props.loading && 'opacity-0']"
    >
      <i
        v-if="props.icon"
        :class="props.icon"
      />
      <slot />
      <i
        v-if="props.appendIcon"
        :class="props.appendIcon"
      />
    </div>
  </button>
</template>
