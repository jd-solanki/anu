import type { ComponentObjectPropsOptions } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import type { ALayerProps } from '@/composables/useLayer'
import { aLayerProps } from '@/composables/useLayer'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export interface AChipProps extends ALayerProps {

  /**
   * Bind v-model value to show/hide the chip.
   */
  modelValue?: boolean

  /**
   * Allow to close chip
   */
  closable?: boolean

  /**
   * prepend icon
   */
  icon?: ConfigurableValue

  /**
   * append icon
   */
  appendIcon?: ConfigurableValue

  /**
   * Disable state of component
   */
  disabled?: boolean
}

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
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
  closable: Boolean,
  icon: configurableProp,
  appendIcon: configurableProp,
  disabled: disabledProp,
} as const) satisfies Required<ComponentObjectPropsOptions<AChipProps>>

// 👉 Slots
export const aChipSlots = {

  /**
   * Default slot for rendering chip content
   */
  default: {},
} as const

// 👉 Events
export interface AChipEvents {
  (e: 'update:modelValue', value: boolean): void
  (e: 'click:close'): void
  (e: 'click:appendIcon'): void
}
