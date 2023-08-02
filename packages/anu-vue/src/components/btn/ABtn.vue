<script lang="ts" setup>
import type { aBtnSlots } from './meta'
import { aBtnProps } from './meta'
import { ASpinner } from 'anu-vue/components/spinner'
import { useDefaults } from 'anu-vue/composables/useDefaults'
import { useLayer } from 'anu-vue/composables/useLayer'

// SECTION Meta
const _props = defineProps(aBtnProps)

defineOptions({
  name: 'ABtn',
})

defineSlots<typeof aBtnSlots>()

const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const { getLayerClasses } = useLayer()

const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)
</script>

<template>
  <button
    v-bind="defaultsAttrs"
    :tabindex="props.disabled ? -1 : 0"
    :style="[styles, defaultsStyle]"
    type="button"
    class="inline-flex whitespace-nowrap justify-center items-center relative"
    :class="[
      props.iconOnly ? 'a-btn-icon-only' : 'a-btn',
      props.disabled && 'opacity-50 pointer-events-none',
      classes,
      defaultsClass,
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
