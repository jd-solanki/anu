import { aBaseInputProps, aBaseInputSlots } from 'anu-vue/components/base-input'
import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aTextareaProps = {
  ...aBaseInputProps,
  modelValue: String,

  /**
   * Textarea height. Provide valid CSS height class with `!` prefixed.
   */
  height: String,

  /**
   * Automatically update the height of a textarea depending on the content.
   */
  autoSize: Boolean,
} as const
export type ATextareaProps = ExtractPublicPropTypes<typeof aTextareaProps>

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
