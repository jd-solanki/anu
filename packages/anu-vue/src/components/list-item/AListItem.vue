<script lang="ts" setup>
import { listItemProps } from './props'
import type { listItemSlots } from './slots'
import { AAvatar } from '@/components/avatar'
import { ATypography } from '@/components/typography'
import { ConfigurableValue, useConfigurable } from '@/composables/useConfigurable'
import { useLayer } from '@/composables/useLayer'

const props = defineProps(listItemProps)

defineEmits<{
  (e: 'click:icon'): void
  (e: 'click:avatar'): void
  (e: 'click:iconAppend'): void
  (e: 'click:avatarAppend'): void
}>()

defineOptions({
  name: 'AListItem',
})

defineSlots<typeof listItemSlots>()

const { getLayerClasses } = useLayer()

// TODO: Might need to handle `undefined` as value of `_titleProp`
// ℹ️ Reduce the size of title to 1rem. We did the same in ACard as well.
const _titleProp = useConfigurable(props.title)
if (Array.isArray(_titleProp.value.classes))
  _titleProp.value.classes = [..._titleProp.value.classes, 'text-base']
else
  _titleProp.value.classes += ' text-base'

// useLayer
const { styles, classes } = getLayerClasses(
  computed(() => props.isActive ? (props.color || 'primary') : undefined),
  computed(() => props.isActive ? (props.variant || 'light') : 'text'),
  toRef(props, 'states'),
  { statesClass: 'states:10' },
)
</script>

<template>
  <li
    :style="styles"
    class="a-list-item flex items-center"
    :class="[
      { 'opacity-50 pointer-events-none': props.disabled },
      props.value !== undefined || $attrs.onClick
        ? [...classes, 'cursor-pointer']
        : '',
    ]"
  >
    <slot
      :item="props"
      :attrs="$attrs"
    >
      <!-- 👉 Slot: prepend -->
      <slot
        name="prepend"
        :item="props"
        :attrs="$attrs"
      >
        <i
          v-if="props.icon && !props.iconAppend"
          class="text-xl"
          :class="props.icon"
          @click="$emit('click:icon')"
        />
        <AAvatar
          v-if="props.avatarProps && !props.avatarAppend"
          v-bind="props.avatarProps"
          @click="$emit('click:avatar')"
        />
      </slot>
      <!-- 👉 Slot: default slot -->
      <slot
        name="content"
        :item="props"
        :attrs="$attrs"
      >
        <ATypography
          class="flex-grow"
          :subtitle="props.subtitle"
          :text="props.text"
          :title="props.title ? Object.values(_titleProp) as ConfigurableValue : undefined"
        />
      </slot>
      <!-- 👉 Slot: append -->
      <slot
        name="append"
        :item="props"
        :attrs="$attrs"
      >
        <i
          v-if="props.icon && props.iconAppend"
          class="text-xl"
          :class="props.icon"
          @click="$emit('click:iconAppend')"
        />
        <AAvatar
          v-if="props.avatarProps && props.avatarAppend"
          v-bind="props.avatarProps"
          @click="$emit('click:avatarAppend')"
        />
      </slot>
    </slot>
  </li>
</template>
