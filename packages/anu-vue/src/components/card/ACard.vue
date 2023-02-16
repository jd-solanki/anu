<script lang="ts" setup>
import { ATypography } from '../typography'
import { cardProps } from './props'
import type { cardSlots } from './slots'
import { cardTypographySlots } from './slots'
import { ALoader } from '@/components/loader'
import { isTypographyUsed } from '@/components/typography/utils'
import { ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useLayer } from '@/composables/useLayer'
import { useSpacing } from '@/composables/useSpacing'

const props = defineProps(cardProps)

defineOptions({
  name: 'ACard',
})

defineSlots<typeof cardSlots>()

const slots = useSlots()

const spacing = useSpacing(toRef(props, 'spacing'))
const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

console.log('slots :>> ', slots)
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
  <div
    class="a-card relative overflow-hidden bg-[hsla(var(--a-surface-c),var(--un-bg-opacity,1))]"
    :class="classes"
    :style="[
      ...styles,
      { '--a-spacing': spacing / 100 },
    ]"
  >
    <!-- 👉 Loader  -->
    <!--
        ℹ️ We have intentionally placed loader on top.
        Because we have card content style based on last child pseudo selector.
    -->
    <ALoader
      v-if="typeof props.loading !== 'undefined'"
      v-bind="typeof props.loading === 'boolean' ? { loading: props.loading } : props.loading"
    />

    <!-- 👉 Image -->
    <img
      v-if="props.img"
      :src="props.img"
      :alt="props.imgAlt"
    >

    <!-- 👉 Typography -->
    <div
      v-if="_isTypographyUsed"
      class="a-card-typography-wrapper"
    >
      <ATypography
        :title="props.title"
        :subtitle="props.subtitle"
        :text="Object.values(_textProp) as ConfigurableValue"
      >
        <!-- ℹ️ Recursively pass down slots to child -->
        <template
          v-for="name in Object.keys(cardTypographySlots)"
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

    <!-- 👉 Slot: Default -->
    <slot />
  </div>
</template>
