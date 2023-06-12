<script lang="ts" setup>
import type { Ref } from 'vue'
import type { aLoaderSlots } from './meta'
import { aLoaderProps, aLoaderTypographySlots } from './meta'
import { ASpinner } from '@/components'
import { isTypographyUsed } from '@/components/typography/utils'
import { type ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { useDefaults } from '@/composables/useDefaults'
import { filterUsedSlots } from '@/utils/vue'

// SECTION Meta
const _props = defineProps(aLoaderProps)
defineSlots<typeof aLoaderSlots>()

defineOptions({
  name: 'ALoader',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const slots = useSlots()

// TODO: Create composable useLazyVShow
const isShownOnce = ref(props.loading)
watchOnce(
  () => props.loading,
  () => { isShownOnce.value = true },
)

// ℹ️ Typography
const _isTypographyUsed = isTypographyUsed(toRefs(props), slots)

// Modify text prop to have `text-sm`
const _textProp = useConfigurable(toRef(props, 'text'))
if (_textProp.value.classes === undefined)
  _textProp.value.classes = 'text-sm'
else if (Array.isArray(_textProp.value.classes))
  _textProp.value.classes = [..._textProp.value.classes, 'text-sm']
else
  _textProp.value.classes = ' text-sm'

// Prevent scrolling when full page mode
if (props.fullPage) {
  // Lock DOM scroll when modelValue is `true`
  // ℹ️ We need to use type assertion here because of this issue: https://github.com/johnsoncodehk/volar/issues/2219
  useDOMScrollLock(toRef(props, 'loading') as Ref<boolean>)
}
</script>

<template>
  <div
    v-if="isShownOnce"
    v-show="props.loading"
    v-bind="defaultsAttrs"
    :style="defaultsStyle"
    class="a-loader overlay flex items-center justify-center flex-col text-center gap-4"
    :class="[props.loading && 'opacity-100', props.fullPage && 'a-loader-full-page fixed inset-0 z-54', defaultsClass]"
  >
    <!-- 👉 Slot: default -->
    <slot>
      <ASpinner class="a-loader-spinner text-[hsl(var(--a-layer-c))]" />
    </slot>
    <!-- 👉 Typography -->
    <div
      v-if="_isTypographyUsed"
      class="a-loader-typography-wrapper"
    >
      <ATypography
        :title="props.title"
        :subtitle="props.subtitle"
        :text="Object.values(_textProp) as ConfigurableValue"
        style="--a-title-c: var(--a-layer-c); --a-subtitle-c: var(--a-layer-c)"
      >
        <!-- ℹ️ Recursively pass down slots to child -->
        <template
          v-for="name in filterUsedSlots(aLoaderTypographySlots)"
          #[name]="slotProps"
        >
          <slot
            :name="name"
            v-bind="slotProps"
          />
        </template>
      </ATypography>
    </div>
  </div>
</template>
