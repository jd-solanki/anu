import type { ComponentObjectPropsOptions } from 'vue'
import type { ABaseInputProps } from '@/components/base-input'
import { aBaseInputProps, aBaseInputSlots } from '@/components/base-input'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ATextareaProps extends ABaseInputProps {
  modelValue?: string

  /**
   * Textarea height. Provide valid CSS height class with `!` prefixed.
   */
  height?: string

  /**
   * Automatically update the height of a textarea depending on the content.
   */
  autoSize?: boolean
}

export const aTextareaProps = ({
  ...aBaseInputProps,
  modelValue: String,
  height: String,
  autoSize: Boolean,
} as const) satisfies Required<ComponentObjectPropsOptions<ATextareaProps>>

// 👉 Slots
const { default: _, ...aTextareaBaseInputSlots } = aBaseInputSlots

export { aTextareaBaseInputSlots }
export const aTextareaSlots = {
  ...aTextareaBaseInputSlots,
} as const

// 👉 Events
export interface ATextareaEvents {
  (e: 'update:modelValue', value: ATextareaProps['modelValue']): void
}
