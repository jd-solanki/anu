<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import { ABaseInput, baseInputProps } from '@/components/base-input'

const props = defineProps(defu({
  modelValue: String,
  height: String,
}, baseInputProps))

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'ATextarea',
  inheritAttrs: false,
})

const _baseInputProps = reactivePick(props, Object.keys(baseInputProps) as Array<keyof typeof baseInputProps>)

const textarea = ref<HTMLTextAreaElement>()

const handleInputWrapperClick = () => {
  textarea.value?.focus()
}
</script>

<template>
  <!-- ℹ️ `overflow-hidden` on input wrapper will prevent square edge when textarea will have scrollbar -->
  <ABaseInput
    v-bind="{ ..._baseInputProps, class: $attrs.class }"
    :input-wrapper-classes="['min-h-32 overflow-hidden', props.height, props.inputWrapperClasses]"
    class="a-textarea !pointer-events-auto"
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
        class="a-textarea-textarea bg-transparent resize-none"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </template>
  </ABaseInput>
</template>
