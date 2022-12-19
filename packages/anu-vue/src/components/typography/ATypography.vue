<script lang="ts" setup>
import type { TypographyProps } from './props'
import { typographyPropsDefaults } from './props'
import { useConfigurable } from '@/composables/useConfigurable'

interface Props extends TypographyProps {}

const props = withDefaults(defineProps<Props>(), { ...typographyPropsDefaults })

defineOptions({
  name: 'ATypography',
})

const title = useConfigurable(toRef(props, 'title'))
const subtitle = useConfigurable(toRef(props, 'subtitle'))
const text = useConfigurable(toRef(props, 'text'))
</script>

<template>
  <div class="uno-layer-base-text-base gap-4 flex flex-col">
    <!-- SECTION Typography header -->
    <div
      v-if="$slots.title || props.title || $slots.subtitle || props.subtitle || $slots['header-right']"
      class="flex justify-between"
    >
      <div class="flex-grow">
        <!-- 👉 Title -->
        <component
          :is="props.titleTag"
          v-if="props.title || $slots.title"
          v-bind="title.attrs"
          class="font-medium block em:uno-layer-base-text-lg uno-layer-base-text-[hsla(var(--a-typography-title-color),var(--a-typography-title-opacity))]"
          :class="[title.classes]"
        >
          <slot name="title">
            {{ title.content }}
          </slot>
        </component>

        <!-- 👉 Subtitle -->
        <component
          :is="props.subtitleTag"
          v-if="props.subtitle || $slots.subtitle"
          v-bind="subtitle.attrs"
          class="block em:uno-layer-base-text-sm uno-layer-base-text-[hsla(var(--a-typography-subtitle-color),var(--a-typography-subtitle-opacity))]"
          :class="[subtitle.classes]"
        >
          <slot name="subtitle">
            {{ subtitle.content }}
          </slot>
        </component>

        <!-- 👉 Slot: header-right -->
        <slot name="header-right" />
      </div>
    </div>
    <!-- !SECTION -->

    <!-- 👉 Text -->
    <component
      :is="props.textTag"
      v-if="props.text || $slots.text"
      v-bind="text.attrs"
      class="uno-layer-base-text-[hsla(var(--a-typography-text-color),var(--a-typography-text-opacity))]"
      :class="[text.classes]"
    >
      <slot>
        {{ text.content }}
      </slot>
    </component>
  </div>
</template>
