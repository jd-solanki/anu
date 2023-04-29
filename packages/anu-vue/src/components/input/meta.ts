import type { ComponentObjectPropsOptions } from 'vue'
import type { ABaseInputProps } from '@/components/base-input'
import { aBaseInputProps, aBaseInputSlots } from '@/components/base-input'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface AInputProps extends ABaseInputProps {
  modelValue?: string | number
}

export const aInputProps = ({
  ...aBaseInputProps,
  modelValue: [String, Number] as PropType<AInputProps['modelValue']>,
} as const) satisfies Required<ComponentObjectPropsOptions<AInputProps>>

// 👉 Slots
const { default: _, ...aTextareaBaseInputSlots } = aBaseInputSlots

export { aTextareaBaseInputSlots }
export const aInputSlots = {
  ...aTextareaBaseInputSlots,
} as const

// 👉 Events
export interface AInputEvents {
  (e: 'update:modelValue', value: AInputProps['modelValue']): void
}
