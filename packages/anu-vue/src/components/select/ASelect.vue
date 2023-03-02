<script lang="ts" setup>
import { flip, offset, shift } from '@floating-ui/vue'
import { defu } from 'defu'
import type { ExtractPropTypes, PropType } from 'vue'
import type { selectSlots } from './slots'
import { selectBaseInputSlots, selectCardSlots, selectListDefaultSlot, selectListRestSlots, selectListSlotsPrefix } from './slots'
import { ACard, AList } from '@/components'
import { ABaseInput, baseInputProps } from '@/components/base-input'
import { AFloating, sameWidthFloatingUIMiddleware } from '@/components/floating'
import type { ListPropItems } from '@/components/list'
import { isObject, prefixObjectKeysWithMeta } from '@/utils/helpers'

export interface ObjectOption { label: string; value: string | number }

const props = defineProps(defu({
  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  modelValue: { type: null },
  options: {
    type: Array as PropType<ListPropItems>,
    default: () => [],
  },
  emitObject: Boolean,

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  optionsWrapperClasses: { type: null },
  listClasses: { type: null },
}, baseInputProps))

const emit = defineEmits<{
  (e: 'change', value: (ExtractPropTypes<typeof props>)['modelValue']): void
  (e: 'input', value: (ExtractPropTypes<typeof props>)['modelValue']): void
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ASelect',
  inheritAttrs: false,
})

defineSlots<typeof selectSlots>()

const _baseInputProps = reactivePick(props, Object.keys(baseInputProps) as Array<keyof typeof baseInputProps>)

// SECTION Floating
// Template refs
const refReference = ref()
const refFloating = ref()
const selectRef = ref<HTMLSelectElement>()

const isOptionsVisible = ref(false)

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
const handleOptionClick = (value: any, item?: ListPropItems[number]) => {
  const valueToEmit = (item && props.emitObject) ? item : value
  emit('change', valueToEmit)
  emit('input', valueToEmit)
  emit('update:modelValue', valueToEmit)
}
const closeOptions = (event: MouseEvent) => {
  if (event.target !== refFloating.value)
    isOptionsVisible.value = false
}

// 👉 Middleware
const middleware = () => [
  offset(6),
  sameWidthFloatingUIMiddleware(refFloating),
  flip(),
  shift({ padding: 10 }),
]

const slots = useSlots()
const cardSlotsToPass = computed(() => Object.fromEntries(Object.entries(selectCardSlots).filter(([slotName]) => slots[slotName])))

const selectListPrefixedSlots = {
  ...prefixObjectKeysWithMeta(selectListRestSlots, selectListSlotsPrefix),
  ...prefixObjectKeysWithMeta(selectListDefaultSlot, ''),
}
</script>

<template>
  <!-- 👉 Select Input -->
  <ABaseInput
    v-bind="{ ..._baseInputProps, class: $attrs.class }"
    ref="refReference"
    append-inner-icon="i-bx-chevron-down"
    class="a-select"
    :input-container-attrs="{
      onClick: handleInputClick,
    }"
  >
    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="name in Object.keys(selectBaseInputSlots)"
      #[name]="slotProps"
    >
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
        class="a-select-input"
        :value="isObject(modelValue) ? modelValue.text : modelValue"
      >
    </template>
  </ABaseInput>

  <!-- 👉 Select options -->
  <AFloating
    :reference-el="refReference && refReference.refInputContainer"
    :middleware="middleware"
    class="a-select-floating"
  >
    <ACard
      v-show="isOptionsVisible"
      ref="refFloating"
      :data-slots="Object.keys($slots)"
      class="a-select-options-container bg-[hsl(var(--a-surface-c))]"
      :class="props.optionsWrapperClasses"
      @click="closeOptions"
    >
      <!-- ℹ️ Recursively pass down slots to child -->
      <template
        v-for="name in Object.keys(cardSlotsToPass)"
        #[name]="slotProps"
      >
        <slot
          :name="name"
          v-bind="slotProps || {}"
        />
      </template>
      <AList
        :items="options"
        :value="props.modelValue"
        class="a-select-options-list"
        :class="props.listClasses"
        @click:item="({ item, value }) => handleOptionClick(value, item)"
      >
        <!-- ℹ️ Recursively pass down slots to child -->
        <template
          v-for="{ originalKey: originalSlotName, prefixedKey: updatedSlotName } in selectListPrefixedSlots"
          #[originalSlotName]="slotProps"
        >
          <slot
            :name="updatedSlotName"
            v-bind="{
              ...(slotProps || {}),
              ...({ handleOptionClick }),
            }"
          />
        </template>
      </AList>
    </ACard>
  </AFloating>
</template>
