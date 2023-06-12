<script lang="ts" setup>
import type { aTypographySlots } from './meta'
import { aTypographyProps } from './meta'
import { useConfigurable } from '@/composables/useConfigurable'
import { useDefaults } from '@/composables/useDefaults'

// SECTION Meta
const _props = defineProps(aTypographyProps)
defineSlots<typeof aTypographySlots>()

defineOptions({
  name: 'ATypography',
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION
const title = useConfigurable(toRef(props, 'title'))
const subtitle = useConfigurable(toRef(props, 'subtitle'))
const text = useConfigurable(toRef(props, 'text'))
</script>

<template>
  <div
    class="gap-4 flex flex-col"
    :class="defaultsClass"
    :style="defaultsStyle"
    v-bind="defaultsAttrs"
  >
    <!-- SECTION Typography header -->
    <div
      v-if="$slots.title || props.title || $slots.subtitle || props.subtitle || $slots['header-right']"
      class="flex justify-between"
    >
      <div class="flex-grow">
        <!-- 👉 Title -->
        <Component
          :is="props.titleTag"
          v-if="(Array.isArray(props.title) ? props.title[0] : props.title) || $slots.title"
          v-bind="title.attrs"
          class="a-title"
          :class="[title.classes]"
        >
          <slot name="title">
            {{ title.content }}
          </slot>
        </Component>

        <!-- 👉 Subtitle -->
        <Component
          :is="props.subtitleTag"
          v-if="(Array.isArray(props.subtitle) ? props.subtitle[0] : props.subtitle) || $slots.subtitle"
          v-bind="subtitle.attrs"
          class="a-subtitle"
          :class="[subtitle.classes]"
        >
          <slot name="subtitle">
            {{ subtitle.content }}
          </slot>
        </Component>
      </div>
      <!-- 👉 Slot: header-right -->
      <slot name="header-right" />
    </div>
    <!-- !SECTION -->

    <!-- 👉 Text -->
    <Component
      :is="props.textTag"
      v-if="(Array.isArray(props.text) ? props.text[0] : props.text) || $slots.text"
      v-bind="text.attrs"
      class="a-text"
      :class="[text.classes]"
    >
      <slot>
        {{ text.content }}
      </slot>
    </Component>
  </div>
</template>
