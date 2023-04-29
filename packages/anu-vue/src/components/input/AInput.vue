<script lang="ts" setup>
import type { AInputEvents, AInputProps } from './meta'
import { aInputProps, aTextareaBaseInputSlots } from './meta'
import { ABaseInput, aBaseInputProps } from '@/components/base-input'

const props = defineProps(aInputProps)
defineEmits<AInputEvents>()

defineOptions({
  name: 'AInput',
  inheritAttrs: false,
})

const _baseInputProps = reactivePick(props, Object.keys(aBaseInputProps) as Array<keyof AInputProps>)
const attrs = useAttrs()

const input = ref<HTMLInputElement>()

const isInputTypeFile = attrs.type && attrs.type === 'file'

function handleInputWrapperClick() {
  input.value?.focus()
}
</script>

<template>
  <ABaseInput
    v-bind="{ ..._baseInputProps, class: $attrs.class }"
    :class="[isInputTypeFile && 'a-input-type-file']"
    class="a-input"
    @click:inputWrapper="handleInputWrapperClick"
  >
    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="(_, name) in aTextareaBaseInputSlots"
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
        ref="input"
        class="a-input-input"
        :value="props.modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      >
    </template>
  </ABaseInput>
</template>
