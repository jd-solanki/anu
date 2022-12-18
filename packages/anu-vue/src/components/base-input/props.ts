import type { HTMLAttributes } from 'vue'

export interface BaseInputProps {
  spacing?: number
  inputWrapperClasses?: any

  inputContainerAttrs?: HTMLAttributes
  hint?: string
  error?: string
  label?: string
  prependIcon?: string
  appendIcon?: string
  prependInnerIcon?: string
  appendInnerIcon?: string
  disabled?: boolean
  readonly?: boolean
}
