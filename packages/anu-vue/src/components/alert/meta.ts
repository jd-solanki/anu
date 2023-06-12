import type { ExtractPublicPropTypes } from 'vue'
import { aLayerProps } from '@/composables/useLayer'
import { configurable } from '@/composables/useProps'

// ℹ️ Make sure to checkout prop definition rules

// 👉 Props
export const aAlertProps = {
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

  /**
   * prepend icon
   */
  icon: configurable,

  /**
   * append (close) icon
   */
  appendIcon: configurable,

  /**
   * Make alert dismissible using this prop. Adds close icon as appended icon.
   */
  dismissible: Boolean,

  /**
   * Hide/Show alert based on v-model value
   */
  modelValue: {
    type: Boolean,
    default: undefined,
  },
} as const
export type AAlertProps = ExtractPublicPropTypes<typeof aAlertProps>

// 👉 Slots
export const aAlertSlots = {

  /**
   * Default slot for rendering alert content
   */
  default: (_: any) => null,

  /**
   * Slot for appending content to alert
   */
  append: (_: any) => null,
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
