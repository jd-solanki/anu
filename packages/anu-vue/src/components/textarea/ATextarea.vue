<script lang="ts" setup>
import type { ATextareaEvents, aTextareaSlots } from './meta'
import { aTextareaBaseInputSlots, aTextareaProps } from './meta'
import { ABaseInput, aBaseInputProps } from '@/components/base-input'
import { useDefaults } from '@/composables/useDefaults'
import { filterUsedSlots } from '@/utils/vue'

// SECTION Meta
const _props = defineProps(aTextareaProps)
const emit = defineEmits<ATextareaEvents>()
defineSlots<typeof aTextareaSlots>()

defineOptions({
  name: 'ATextarea',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const textareaValue = useVModel(props, 'modelValue', emit, { defaultValue: '', passive: true })

// const _baseInputProps = reactivePick(props, Object.keys(aBaseInputProps) as Array<keyof ABaseInputProps>)
const _baseInputProps = reactivePick(props, Object.keys(aBaseInputProps) as any)

const textarea = ref<HTMLTextAreaElement>()

function handleInputWrapperClick() {
  textarea.value?.focus()
}

const refBaseInput = ref<ABaseInput>()
if (props.autoSize) {
  const refInputWrapper = computed(() => refBaseInput.value?.refInputWrapper)
  useTextareaAutosize({
    element: textarea,
    input: textareaValue,
    styleTarget: refInputWrapper,
  })
}
</script>

<template>
  <!-- ℹ️ `overflow-hidden` on input wrapper will prevent square edge when textarea will have scrollbar -->
  <ABaseInput
    ref="refBaseInput"
    v-bind="{ ..._baseInputProps, class: $attrs.class }"
    :style="defaultsStyle"
    class="a-textarea !pointer-events-auto"
    :class="[
      props.autoSize && 'a-textarea-auto-size',
      defaultsClass,
    ]"
    :input-wrapper-classes="['overflow-hidden', props.height, props.inputWrapperClasses]"
    @click:inputWrapper="handleInputWrapperClick"
  >
    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="name in filterUsedSlots(aTextareaBaseInputSlots)"
      #[name]="slotProps"
    >
      <slot
        :name="name"
        v-bind="slotProps"
      />
    </template>
    <template #default="slotProps">
      <textarea
        v-bind="{ ...defaultsAttrs, ...$attrs, ...slotProps }"
        ref="textarea"
        v-model="textareaValue"
        class="a-textarea-textarea bg-transparent resize-none"
      />
    </template>
  </ABaseInput>
</template>
