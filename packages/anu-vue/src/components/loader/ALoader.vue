<script setup lang="ts">
import { ATypography } from '../typography'
import ASpinner from './ASpinner.vue'
import { loaderProps } from './props'
import { isTypographyUsed } from '@/components/typography/utils'
import { ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(loaderProps)

defineOptions({
  name: 'ALoader',
})

const slots = useSlots()
const attrs = useAttrs()

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

// FIXME Can't found a better way to change the background overlay depending of the layer. It's not perfect for transparent variant like light, text or outline.
const attrsClasses = attrs.class as string || ''
const overlayClasses = computed(() => {
  // We skip if there is some bg-* classes
  if (!props.overlay || attrsClasses.split(' ').some(c => /^bg-(.+)$/.test(c)))
    return
  if (!props.variant || props.variant === 'fill')
    return 'bg-$a-layer-color'

  if (props.variant === 'outline')
    return 'bg-white dark:bg-dark !border-none states'

  if (props.variant === 'light')
    return 'bg-$a-layer-color states'

  return 'bg-$a-layer-color' // bg-light dark:bg-dark'
})

if (props.overlay) {
  onMounted(() => {
    const instance = getCurrentInstance()

    // Add `relative` class to parent if overlay props
    // FIXME It's work but it's ugly and not secure at all. Should we ask developer to add `relative` class themselves ?
    if (instance?.parent?.vnode.el)
      instance.parent.vnode.el.classList.add('relative', 'overflow-hidden')
  })
}

// Prevent scrolling when full page mode
if (props.fullPage) {
  const isLocked = useScrollLock(document.body, false)

  watch(() => props.loading, () => {
    isLocked.value = props.loading
  }, { immediate: true })
}

const _isTypographyUsed = isTypographyUsed(toRefs(props), slots)

// Modify text prop to have `text-sm`
const _textProp = useConfigurable(toRef(props, 'text'))
if (_textProp.value.classes === undefined)
  _textProp.value.classes = 'text-sm'
else if (Array.isArray(_textProp.value.classes))
  _textProp.value.classes = [..._textProp.value.classes, 'text-sm']
else
  _textProp.value.classes = ' text-sm'
</script>

<template>
  <!-- ℹ️ We need class `contents` to use component inline and align well in ABtn icon-only. -->
  <div
    v-if="loading"
    :class="!overlay && !fullPage ? 'relative inline-block' : 'contents'"
  >
    <div
      class="a-loader contents"
      :class="[
        (overlay || fullPage) && 'a-loader-overlay absolute z-1 top-0 bottom-0 left-0 right-0 w-full flex flex-col gap-2 items-center justify-center text-center',
        fullPage && 'fixed !z-9999',
        overlayClasses,
        ...classes,
      ]"
      :style="styles"
    >
      <!-- 👉 Slot: Default -->
      <slot>
        <ASpinner
          class="a-loader-spinner w-$a-spinner-size h-$a-spinner-size rounded-full"
        />
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

    <!-- 👉 Overlay mask -->
    <div
      v-if="overlay || fullPage"
      class="a-loader-overlay-mask bg-white dark:bg-dark absolute top-0 bottom-0 left-0 right-0 w-full"
      :class="fullPage && 'fixed !z-9998'"
    />
  </div>
</template>
