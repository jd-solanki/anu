<script lang="ts" setup>
import type { AInputEvents } from './meta'
import { aInputProps, aTextareaBaseInputSlots } from './meta'
import { ABaseInput, aBaseInputProps } from '@/components/base-input'
import { useDefaults } from '@/composables/useDefaults'
import { filterUsedSlots } from '@/utils/vue'

// SECTION Meta
const _props = defineProps(aInputProps)
defineEmits<AInputEvents>()

defineOptions({
  name: 'AInput',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

// const _baseInputProps = reactivePick(props, Object.keys(aBaseInputProps) as Array<keyof AInputProps>)
const _baseInputProps = reactivePick(props, Object.keys(aBaseInputProps) as any)
const attrs = useAttrs()

const input = ref<HTMLInputElement>()

const isInputTypeFile = attrs.type && attrs.type === 'file'

function handleInputWrapperClick() {
  input.value?.focus()
}
</script>

<template>
  <ABaseInput
    v-bind="{ ..._baseInputProps, ...defaultsAttrs, class: $attrs.class }"
    :class="[defaultsClass, isInputTypeFile && 'a-input-type-file']"
    class="a-input"
    :style="defaultsStyle"
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
