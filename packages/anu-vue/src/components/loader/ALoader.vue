<script lang="ts" setup>
import type { Ref } from 'vue'
import ASpinner from './ASpinner.vue'
import { loaderProps } from './props'
import { isTypographyUsed } from '@/components/typography/utils'
import { useColor } from '@/composables'
import { ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { useTypographyColor } from '@/composables/useTypographyColor'

const props = defineProps(loaderProps)

defineOptions({
  name: 'ALoader',
})

const slots = useSlots()

const _loaderColor = computed(() => props.color || 'hsla(var(--a-base-color), var(--a-text-emphasis-medium-opacity))')
const _overlayColor = computed(() => props.overlayColor || 'hsla(var(--a-layer), 0.8)')
const _typographyColor = computed(() => props.typographyColor || null)

const { styles: loaderStyles } = useColor(_loaderColor, 'loader-color')
const { styles: overlayStyles } = useColor(_overlayColor, 'loader-overlay-color', 'bg')

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

const { typographyClasses } = useTypographyColor(_typographyColor)

// Prevent scrolling when full page mode
if (props.fullPage) {
  // Lock DOM scroll when modelValue is `true`
  // ℹ️ We need to use type assertion here because of this issue: https://github.com/johnsoncodehk/volar/issues/2219
  useDOMScrollLock(toRef(props, 'loading') as Ref<boolean>)
}
</script>

<template>
  <!-- TODO: Use loader's CSS color instead of layer color: bg-[hsla(var(--a-layer),0.85)] -->
  <div
    v-if="isShownOnce"
    v-show="props.loading"
    class="a-loader-wrapper inline-block align-middle text-center rounded-inherit overflow-hidden"
    :class="[
      props.overlay && 'absolute inset-0',
    ]"
  >
    <div
      :style="props.overlay || props.fullPage ? overlayStyles : undefined"
      class="a-loader-overlay"
      :class="[
        (props.overlay || props.fullPage) && 'w-full h-full flex flex-col gap-3 items-center justify-center overflow-hidden',
        props.fullPage && 'fixed inset-0 z-54',
      ]"
    >
      <!-- 👉 Slot: default -->
      <slot>
        <ASpinner
          :style="loaderStyles"
          class="a-loader-spinner w-$a-spinner-size h-$a-spinner-size rounded-full"
        />
      </slot>

      <!-- 👉 Typography -->
      <div
        v-if="_isTypographyUsed"
        class="a-loader-typography-wrapper"
      >
        <ATypography
          :class="typographyClasses"
          :title="props.title"
          :subtitle="props.subtitle"
          :text="Object.values(_textProp) as ConfigurableValue"
        >
          <!-- ℹ️ Recursively pass down slots to child -->
          <template
            v-for="name in Object.keys($slots).filter(slotName => slotName !== 'default')"
            #[name]="slotProps"
          >
            <!-- ℹ️ v-if condition will omit passing slots. Here, we don't want to pass default slot. -->
            <slot
              :name="name"
              v-bind="slotProps || {}"
            />
          </template>
        </ATypography>
      </div>
    </div>
  </div>
</template>
