<script lang="ts" setup>
import type { ExtractPropTypes } from 'vue'
import { ABaseInput, baseInputProps } from '@/components/base-input'

const props = defineProps(Object.assign(baseInputProps, {
  modelValue: [String, Number],
}))

const emit = defineEmits<{
  (e: 'update:modelValue', value: (ExtractPropTypes<typeof props>)['modelValue']): void
}>()

defineOptions({
  name: 'AInput',
  inheritAttrs: false,
})

const _baseInputProps = reactivePick(props, Object.keys(baseInputProps))
const attrs = useAttrs()

const input = ref<HTMLInputElement>()

const isInputTypeFile = attrs.type && attrs.type === 'file'

const handleChange = (e: Event) => {
  const val = (e.target as HTMLInputElement).value

  //   emit('input', val)
  emit('update:modelValue', val)
}

const handleInputWrapperClick = () => {
  input.value?.focus()
}
</script>

<template>
  <ABaseInput
    v-bind="_baseInputProps"
    :class="[isInputTypeFile && 'a-input-type-file']"
    @click:inputWrapper="handleInputWrapperClick"
  >
    <!-- ℹ️ Recursively pass down slots to child -->
    <template
      v-for="(_, name) in $slots"
      #[name]="slotProps"
    >
      <!-- ℹ️ v-if condition will omit passing slots defined in array. Here, we don't want to pass default slot. -->
      <slot
        v-if="name !== 'default'"
        :name="name"
        v-bind="slotProps || {}"
      />
    </template>
    <template #default="slotProps">
      <input
        v-bind="{ ...slotProps, ...$attrs }"
        ref="input"
        :value="props.modelValue"
        @input="handleChange"
      >
    </template>
  </ABaseInput>
</template>
