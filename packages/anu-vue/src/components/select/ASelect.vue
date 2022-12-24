<script lang="ts" setup>
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { defu } from 'defu'
import type { ExtractPropTypes, PropType } from 'vue'
import { ABaseInput, baseInputProps } from '@/components/base-input'

import { useTeleport } from '@/composables/useTeleport'
import { isObject } from '@/utils/helpers'

export interface ObjectOption { label: string; value: string | number }
type SelectOption = string | number | ObjectOption

const props = defineProps(defu({
  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  modelValue: { type: null },
  options: {
    type: [String, Number, Object] as PropType<SelectOption[]>,
    default: () => [],
  },
  emitObject: Boolean,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  optionsWrapperClasses: { type: null },
}, baseInputProps))

const emit = defineEmits<{

  // (e: 'input', value: (ExtractPropTypes<typeof props>)['modelValue']): void
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ASelect',
  inheritAttrs: false,
})

const _baseInputProps = reactivePick(props, Object.keys(baseInputProps) as Array<keyof typeof baseInputProps>)

const { teleportTarget } = useTeleport()
const isMounted = useMounted()

// SECTION Floating
// Template refs
const refReference = ref()
const selectRef = ref<HTMLSelectElement>()
const refFloating = ref()

const isObjectOption = (option: SelectOption) => isObject(option) && 'label' in option && 'value' in option
const isOptionsVisible = ref(false)

const calculateFloatingPosition = async () => {
  const { x, y } = await computePosition(refReference.value.refInputContainer, refFloating.value, {
    placement: 'bottom-start',
    middleware: [
      offset(6),
      {
        name: 'sameWidth',
        fn: ({ rects, x, y }) => {
          // Set width of reference to floating
          refFloating.value.style.width = `${rects.reference.width}px`

          return { x, y }
        },
      },
      flip(),
      shift({ padding: 10 }),
    ],
  })

  Object.assign(refFloating.value.style, {
    left: `${x}px`,
    top: `${y}px`,
  })
}

let floatingUiCleanup: Function = () => { }
onMounted(() => {
  nextTick(() => {
    floatingUiCleanup = autoUpdate(refReference.value.refInputContainer, refFloating.value, calculateFloatingPosition)
  })
})

onBeforeUnmount(() => floatingUiCleanup())

onClickOutside(
  refFloating,
  _event => {
    if (isOptionsVisible.value)
      isOptionsVisible.value = false
  },
  {
    ignore: [refReference],
  },
)

// !SECTION
// TODO: You can use it as utility in another components
// TODO: Add some style to indicate currently selected item
const handleInputClick = () => {
  if (!(props.disabled || props.readonly)) {
    isOptionsVisible.value = !isOptionsVisible.value
    selectRef.value?.focus()
  }
}

// 👉 Options
const optionClasses = 'a-select-option states before:transition-none cursor-pointer text-ellipsis overflow-hidden'
const handleOptionClick = (option: SelectOption) => {
  const value = isObjectOption(option) && !props.emitObject ? (option as ObjectOption).value : option

  // Do we really need this emit? 🤔 => I guess no because now on all events get attached to input
  // emit('input', value)
  emit('update:modelValue', value)
}
const closeOptions = (event: MouseEvent) => {
  if (event.target !== refFloating.value)
    isOptionsVisible.value = false
}

// 👉 Value
const selectedValue = computed(() => {
  const option = props.options.find(option => isObjectOption(option)
    ? (option as ObjectOption).value === (!props.emitObject ? props.modelValue : (props.modelValue as ObjectOption).value)
    : option === props.modelValue)

  return option ? isObjectOption(option) ? (option as ObjectOption).label : option : (props.modelValue as ObjectOption | undefined)?.label || ''
})
</script>

<template>
  <!-- 👉 Select Input -->
  <ABaseInput
    v-bind="{ ..._baseInputProps, class: $attrs.class }"
    ref="refReference"
    append-inner-icon="i-bx-chevron-down"
    :input-container-attrs="{
      onClick: handleInputClick,
    }"
  >
    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="name in Object.keys($slots).filter(slotName => slotName !== 'default')"
      #[name]="slotProps"
    >
      <!-- ℹ️ v-if condition will omit passing slots defined in array. Here, we don't want to pass default slot. -->
      <slot
        :name="name"
        v-bind="slotProps || {}"
      />
    </template>
    <template #default="slotProps">
      <input
        v-bind="{ ...$attrs, ...slotProps }"
        ref="selectRef"
        readonly
        :value="selectedValue"
      >
    </template>
  </ABaseInput>

  <!-- 👉 Select options -->
  <Teleport
    v-if="isMounted"
    :to="teleportTarget"
  >
    <ul
      v-show="isOptionsVisible"
      ref="refFloating"
      class="a-select-options-container absolute bg-[hsl(var(--a-layer))]"
      :class="props.optionsWrapperClasses"
      @click="closeOptions"
    >
      <slot :attrs="{ class: optionClasses }">
        <li
          v-for="(option, index) in props.options"
          :key="index"
          :class="optionClasses"
          @click="handleOptionClick(option)"
        >
          {{ isObjectOption(option) ? (option as ObjectOption).label : option }}
        </li>
      </slot>
    </ul>
  </Teleport>
</template>
