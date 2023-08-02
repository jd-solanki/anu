import type { PluginOptions } from 'anu-vue/plugin'
import type { ExtractPublicPropTypes } from 'vue'

// ℹ️ Make sure to checkout meta definition rules

// 👉 Props
export const aConfigProps = {
  /**
   * Component props defaults. Similar to what you pass to `propsDefaults` while initializing Anu plugin.
   */
  props: {
    type: Object as PropType<PluginOptions['propsDefaults']>,
    default: {},
  },
} as const

export type AConfigProps = ExtractPublicPropTypes<typeof aConfigProps>

// 👉 Slots
export const aAlertSlots = {

  /**
   * Default slot to render components affected by provided config
   */
  default: (_: any) => null,
} as const
