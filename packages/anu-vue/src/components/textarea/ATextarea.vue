<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import { ABaseInput, baseInputProps } from '@/components/base-input'

const props = defineProps(defu({
  modelValue: String,

  /**
   * Textarea height. Provide valid CSS height class with `!` prefixed.
   */
  height: String,

  /**
   * Automatically update the height of a textarea depending on the content.
   */
  autoSize: Boolean,
}, baseInputProps))

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ATextarea',
  inheritAttrs: false,
})

const textareaValue = useVModel(props, 'modelValue', emit, { defaultValue: '', passive: true })

const _baseInputProps = reactivePick(props, Object.keys(baseInputProps) as Array<keyof typeof baseInputProps>)

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
    :input-wrapper-classes="['overflow-hidden', props.height, props.inputWrapperClasses]"
    class="a-textarea !pointer-events-auto"
    :class="[props.autoSize && 'a-textarea-auto-size']"
    @click:inputWrapper="handleInputWrapperClick"
  >
    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="name in Object.keys($slots).filter(slotName => slotName !== 'default')"
      #[name]="slotProps"
    >
      <slot
        v-if="name !== 'default'"
        :name="name"
        v-bind="slotProps || {}"
      />
    </template>
    <template #default="slotProps">
      <textarea
        v-bind="{ ...$attrs, ...slotProps }"
        ref="textarea"
        v-model="textareaValue"
        class="a-textarea-textarea bg-transparent resize-none"
      />
    </template>
  </ABaseInput>
</template>
