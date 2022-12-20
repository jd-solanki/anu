import type { ExtractPropTypes, HTMLAttributes, PropType } from 'vue'
import { disabled, readonly, spacing } from '@/composables/useProps'

// TODO: Provide a way to apply classes on root. Later you can target input container & wrapper.
export const baseInputProps = {
  spacing,
  inputWrapperClasses: null,
  inputContainerAttrs: Object as PropType<HTMLAttributes>,
  hint: String,
  error: String,
  label: String,
  prependIcon: String,
  appendIcon: String,
  prependInnerIcon: String,
  appendInnerIcon: String,
  disabled,
  readonly,
}

export type BaseInputProps = ExtractPropTypes<typeof baseInputProps>
