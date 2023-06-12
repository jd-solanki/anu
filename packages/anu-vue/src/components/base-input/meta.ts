import type { ExtractPublicPropTypes, HTMLAttributes, PropType } from 'vue'
import { configurable, disabled, readonly } from '@/composables/useProps'

// ℹ️ Make sure to checkout prop definition rules

// 👉 Props
export const aBaseInputProps = ({

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  /**
   * Input wrapper classes
   */
  inputWrapperClasses: { type: null },

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  /**
   * Input classes
   */
  inputClasses: { type: null },

  /**
   * Input wrapper attributes
   */
  inputWrapperAttrs: Object as PropType<HTMLAttributes>,

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

  /**
   * Set loading state
   */
  loading: Boolean,
} as const)

export type ABaseInputProps = ExtractPublicPropTypes<typeof aBaseInputProps>

// 👉 Slots
export const aBaseInputSlots = {
  'label': (_: any) => null as any,
  'prepend': (_: any) => null as any,
  'prepend-inner': (_: any) => null as any,
  'append-inner': (_: any) => null as any,
  'append': (_: any) => null as any,
  'bottom': (_: any) => null as any,
  'default': (_: {
    id: string | undefined
    readonly: boolean
    disabled: boolean
    class: any
  }) => null as any,
} as const

// 👉 Events
export interface ABaseInputEvents {
  (e: 'click:inputWrapper'): void
}
