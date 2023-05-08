import type { ExtractPublicPropTypes } from 'vue'
import { aLayerProps } from '@/composables/useLayer'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aChipProps = ({
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
   * Bind v-model value to show/hide the chip.
   */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  /**
   * Allow to close chip
   */
  closable: Boolean,

  /**
   * prepend icon
   */
  icon: configurableProp,

  /**
   * append icon
   */
  appendIcon: configurableProp,

  /**
   * Disable state of component
   */
  disabled: disabledProp,
} as const)
export type AChipProps = ExtractPublicPropTypes<typeof aChipProps>

// 👉 Slots
export const aChipSlots = {

  /**
   * Default slot for rendering chip content
   */
  default: (_: any) => null as any,
} as const

// 👉 Events
export interface AChipEvents {
  (e: 'update:modelValue', value: boolean): void
  (e: 'click:close'): void
  (e: 'click:appendIcon'): void
}
