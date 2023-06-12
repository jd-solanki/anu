<script lang="ts" setup>
import { ATypography } from '../typography'
import type { aCardSlots } from './meta'
import { aCardProps, aCardTypographySlots } from './meta'
import { ALoader } from '@/components/loader'
import { isTypographyUsed } from '@/components/typography/utils'
import { type ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useDefaults } from '@/composables/useDefaults'
import { useLayer } from '@/composables/useLayer'
import { filterUsedSlots } from '@/utils/vue'

// SECTION Meta
const _props = defineProps(aCardProps)

defineSlots<typeof aCardSlots>()

defineOptions({
  name: 'ACard',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const slots = useSlots()

const { getLayerClasses } = useLayer()
const { styles, classes } = getLayerClasses(
  toRef(props, 'color'),
  toRef(props, 'variant'),
  toRef(props, 'states'),
)

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
    :class="[classes, defaultsClass]"
    :style="[styles, defaultsStyle]"
    v-bind="defaultsAttrs"
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
          v-for="name in filterUsedSlots(aCardTypographySlots)"
          #[name]="slotProps"
        >
          <slot
            :name="name"
            v-bind="slotProps"
          />
        </template>
      </ATypography>
    </div>

    <!-- 👉 Slot: Default -->
    <slot />
  </div>
</template>
