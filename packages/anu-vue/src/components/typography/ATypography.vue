<script lang="ts" setup>
import { typographyProps } from './props'
import { useConfigurable } from '@/composables/useConfigurable'

const props = defineProps(typographyProps)

defineOptions({
  name: 'ATypography',
})

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
          class="a-typography-title font-medium block em:text-lg text-[hsla(var(--a-typography-title-color),var(--a-typography-title-opacity))]"
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
          class="a-typography-subtitle block em:text-sm text-[hsla(var(--a-typography-subtitle-color),var(--a-typography-subtitle-opacity))]"
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
      class="a-typography-text text-[hsla(var(--a-typography-text-color),var(--a-typography-text-opacity))]"
      :class="[text.classes]"
    >
      <slot>
        {{ text.content }}
      </slot>
    </component>
  </div>
</template>
