import type { ExtractPropTypes, HTMLAttributes, PropType } from 'vue'
import { disabled, readonly, spacing } from '@/composables/useProps'

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
