import type { ExtractPropTypes } from 'vue'
import { useProps as useLayerProps } from '@/composables/useLayer'
import { configurable as configurableProp, disabled as disabledProp } from '@/composables/useProps'

export const btnProps = {

  // let vue-component-meta found it

  /* @ts-expect-error We need to redefine default value so volar can use it for generating component meta */
  color: { default: 'primary' },

  /* @ts-expect-error We need to redefine default value so volar can use it for generating component meta */
  variant: { default: 'fill' },

  ...useLayerProps({
    color: {
      default: 'primary',
    },
    variant: {
      default: 'fill',
    },
    states: {
      default: true,
    },
  }),

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
}

export type BtnProps = ExtractPropTypes<typeof btnProps>
