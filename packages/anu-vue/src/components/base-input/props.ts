import type { ExtractPropTypes, HTMLAttributes, PropType } from 'vue'
import { configurable, disabled, readonly, spacing } from '@/composables/useProps'

// TODO: Provide a way to apply classes on root. Later you can target input container & wrapper.
export const baseInputProps = {
  /**
   * Component spacing
   */
  spacing,

  /**
   * Input wrapper classes
   */
  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  inputWrapperClasses: { type: null },

  /**
   * Input classes
   */
  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  inputClasses: { type: null },

  /**
   * Input container classes
   */
  inputContainerAttrs: Object as PropType<HTMLAttributes>,

  /**
   * Add hint below the form component
   */
  hint: String,

  /**
   * Error text to render. This will replace hint text if provided.
   */
  error: String,

  /**
   * Label of the form component
   */
  label: configurable,

  /**
   * Prepend icon
   */
  prependIcon: String,

  /**
   * Append icon
   */
  appendIcon: String,

  /**
   * Prepend icon inside input
   */
  prependInnerIcon: String,

  /**
   * Append icon inside input
   */
  appendInnerIcon: String,

  /**
   * Set component in disabled state
   */
  disabled,

  /**
   * Set component in readonly mode
   */
  readonly,
}

export type BaseInputProps = ExtractPropTypes<typeof baseInputProps>
