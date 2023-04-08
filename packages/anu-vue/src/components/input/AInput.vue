<script lang="ts" setup>
import { defu } from 'defu'
import type { ExtractPropTypes } from 'vue'
import { ABaseInput, baseInputProps } from '@/components/base-input'

const props = defineProps(defu({
  modelValue: [String, Number],
}, baseInputProps))

defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'AInput',
  inheritAttrs: false,
})

const _baseInputProps = reactivePick(props, Object.keys(baseInputProps) as Array<keyof typeof baseInputProps>)
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
      v-for="name in Object.keys($slots).filter(slotName => slotName !== 'default')"
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
        @input="e => { $emit('update:modelValue', (e.target as HTMLInputElement).value) }"
      >
    </template>
  </ABaseInput>
</template>
