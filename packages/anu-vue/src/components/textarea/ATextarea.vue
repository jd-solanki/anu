<script lang="ts" setup>
import type { BaseInputProps } from '@/components/base-input'
import { ABaseInput } from '@/components/base-input'

type ModelValue = string

interface Props extends BaseInputProps {
  modelValue?: string
  height?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ModelValue): void
}>()

defineOptions({
  name: 'ATextarea',
})

const textarea = ref<HTMLTextAreaElement>()

const handleInputWrapperClick = () => {
  textarea.value?.focus()
}
</script>

<template>
  <ABaseInput
    :input-wrapper-classes="['min-h-32', props.height]"
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
      <textarea
        v-bind="slotProps"
        ref="textarea"
        class="a-textarea bg-transparent resize-none"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </template>
  </ABaseInput>
</template>
