<script lang="ts" setup>
// import type { BaseInputProps } from '@/components/base-input'
import { ABaseInput } from '@/components/base-input'

type ModelValue = string | number

interface Props {
  modelValue: ModelValue
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

defineOptions({
  name: 'AInput',
})

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
        v-bind="slotProps"
        ref="input"
        :value="props.modelValue"
        @input="handleChange"
      >
    </template>
  </ABaseInput>
</template>
