import type { ComponentObjectPropsOptions } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import type { ALayerProps } from '@/composables/useLayer'
import { aLayerProps } from '@/composables/useLayer'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface ABtnProps extends ALayerProps {
  icon?: ConfigurableValue
  appendIcon?: ConfigurableValue
  iconOnly?: boolean
  disabled?: boolean
  loading?: boolean
}

export const aBtnProps = ({
  ...{
    ...aLayerProps,
    color: {
      ...aLayerProps.color,
      default: 'primary',
    },
    variant: {
      ...aLayerProps.variant,
      default: 'fill',
    },
    states: {
      ...aLayerProps.states,
      default: true,
    },
  },

  /**
   * Render icon before button text
   */
  icon: configurableProp,

  /**
   * Append icon after button text
   */
  appendIcon: configurableProp,

  /**
   * Mark button as icon only button to apply square styling
   */
  iconOnly: Boolean,

  /**
   * Set component in disabled state
   */
  disabled: disabledProp,

  /**
   * Set button loading state.
   * Although, `loading` prop accepts boolean value, we set default value to `undefined` to indicate button won't ever use loading (show/hide) and won't render `ASpinner` component.
   * However, if `loading` prop is set to any boolean value (`false`/`true`) it will always render `ASpinner` component.
   */
  loading: {
    type: Boolean,
    default: undefined,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<ABtnProps>>

// 👉 Slots
export const aBtnSlots = {

  /**
   * Default slot for rendering button content
   */
  default: {},
} as const

// 👉 Events
export interface ABtnEvents {}
