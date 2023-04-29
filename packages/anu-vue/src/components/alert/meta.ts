import type { ComponentObjectPropsOptions } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import type { ALayerProps } from '@/composables/useLayer'
import { aLayerProps } from '@/composables/useLayer'
import { configurable } from '@/composables/useProps'

// 👉 Props
// ℹ️ Make sure to checkout prop definition rules
export interface AAlertProps extends ALayerProps {

  /**
   * prepend icon
   */
  icon?: ConfigurableValue

  /**
   * append (close) icon
   */
  appendIcon?: ConfigurableValue

  /**
   * Make alert dismissible using this prop. Adds close icon as appended icon.
   */
  dismissible?: boolean

  /**
   * Hide/Show alert based on v-model value
   */
  modelValue?: boolean
}

export const aAlertProps = ({
  ...{
    ...aLayerProps,
    color: {
      ...aLayerProps.color,
      default: 'primary',
    },
    variant: {
      ...aLayerProps.variant,
      default: 'light',
    },
  },
  icon: configurable,
  appendIcon: configurable,
  dismissible: Boolean,
  modelValue: {
    type: Boolean,
    default: undefined,
  },
} as const) satisfies Required<ComponentObjectPropsOptions<AAlertProps>>

// 👉 Slots
export const aAlertSlots = {

  /**
   * Default slot for rendering alert content
   */
  default: {},

  /**
   * Slot for appending content to alert
   */
  append: {},
} as const

// 👉 Events
export interface AAlertEvents {

  /**
   * Emitted when append icon is clicked, including close icon in closable alert.
   */
  (e: 'click:appendIcon'): void

  /**
   * Emitted when `modelValue` is updated
   */
  (e: 'update:modelValue', value: AAlertProps['modelValue']): void
}
