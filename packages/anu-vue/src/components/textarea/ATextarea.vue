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
  <ABaseInput
    v-bind="_baseInputProps"
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
        v-bind="{ ...slotProps, ...$attrs }"
        ref="textarea"
        class="a-textarea bg-transparent resize-none"
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </template>
  </ABaseInput>
</template>
