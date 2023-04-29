import type { ComponentObjectPropsOptions, HTMLAttributes, PropType } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { configurable, disabled, readonly } from '@/composables/useProps'

// 👉 Props
// ℹ️ Make sure to checkout prop definition rules
export interface ABaseInputProps {

  /**
   * Input wrapper classes
   */
  inputWrapperClasses?: any

  /**
   * Input classes
   */
  inputClasses?: any

  /**
   * Input container classes
   */
  inputContainerAttrs?: HTMLAttributes

  /**
   * Add hint below the form component
   */
  hint?: string

  /**
   * Error text to render. This will replace hint text if provided.
   */
  error?: string

  /**
   * Label of the form component
   */
  label?: ConfigurableValue

  /**
   * Prepend icon
   */
  prependIcon?: string

  /**
   * Append icon
   */
  appendIcon?: string

  /**
   * Prepend icon inside input
   */
  prependInnerIcon?: string

  /**
   * Append icon inside input
   */
  appendInnerIcon?: string

  /**
   * Set component in disabled state
   */
  disabled?: boolean

  /**
   * Set component in readonly mode
   */
  readonly?: boolean

  /**
   * Set loading state
   */
  loading?: boolean
}

export const aBaseInputProps = ({

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  inputWrapperClasses: { type: null },

  // ℹ️ If we want any type need to set `propName: { type: null }`. Using `propName: null` will omit (disable) the prop.
  inputClasses: { type: null },

  inputContainerAttrs: Object as PropType<HTMLAttributes>,
  hint: String,
  error: String,
  label: configurable,
  prependIcon: String,
  appendIcon: String,
  prependInnerIcon: String,
  appendInnerIcon: String,
  disabled,
  readonly,
  loading: Boolean,
} as const) satisfies Required<ComponentObjectPropsOptions<ABaseInputProps>>

// 👉 Slots
export const aBaseInputSlots = {
  'label': {},
  'prepend': {},
  'prepend-inner': {},
  'append-inner': {},
  'append': {},
  'bottom': {},
  'default': {
    id: String() as string | undefined,
    readonly: Boolean as unknown as boolean,
    disabled: Boolean as unknown as boolean,
    class: Object as any,
  },
} as const

// 👉 Events
export interface ABaseInputEvents {
  (e: 'click:inputWrapper'): void
}
