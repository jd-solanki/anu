<script lang="ts" setup>
import { typographyProps } from './props'
import type { typographySlots } from './slots'
import { useConfigurable } from '@/composables/useConfigurable'

const props = defineProps(typographyProps)

defineOptions({
  name: 'ATypography',
})

defineSlots<typeof typographySlots>()

const title = useConfigurable(toRef(props, 'title'))
const subtitle = useConfigurable(toRef(props, 'subtitle'))
const text = useConfigurable(toRef(props, 'text'))
</script>

<template>
  <div class="text-base gap-4 flex flex-col">
    <!-- SECTION Typography header -->
    <div
      v-if="$slots.title || props.title || $slots.subtitle || props.subtitle || $slots['header-right']"
      class="flex justify-between"
    >
      <div class="flex-grow">
        <!-- 👉 Title -->
        <component
          :is="props.titleTag"
          v-if="(Array.isArray(props.title) ? props.title[0] : props.title) || $slots.title"
          v-bind="title.attrs"
          class="a-title"
          :class="[title.classes]"
        >
          <slot name="title">
            {{ title.content }}
          </slot>
        </component>

        <!-- 👉 Subtitle -->
        <component
          :is="props.subtitleTag"
          v-if="(Array.isArray(props.subtitle) ? props.subtitle[0] : props.subtitle) || $slots.subtitle"
          v-bind="subtitle.attrs"
          class="a-subtitle"
          :class="[subtitle.classes]"
        >
          <slot name="subtitle">
            {{ subtitle.content }}
          </slot>
        </component>
      </div>
      <!-- 👉 Slot: header-right -->
      <slot name="header-right" />
    </div>
    <!-- !SECTION -->

    <!-- 👉 Text -->
    <component
      :is="props.textTag"
      v-if="(Array.isArray(props.text) ? props.text[0] : props.text) || $slots.text"
      v-bind="text.attrs"
      class="a-text"
      :class="[text.classes]"
    >
      <slot>
        {{ text.content }}
      </slot>
    </component>
  </div>
</template>
