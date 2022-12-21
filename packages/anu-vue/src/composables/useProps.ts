import { createDefu, defu } from 'defu'
import type { ComponentObjectPropsOptions, PropType } from 'vue'
import type { ConfigurableValue } from '@/composables/useConfigurable'

export const themeColors = ['primary', 'success', 'info', 'warning', 'danger'] as const
export type ThemeColor = typeof themeColors[number]
export type ColorProp = ThemeColor | undefined

export const color = {
  type: [String, undefined] as PropType<ColorProp>,
} as const

export const disabled = { type: Boolean } as const

export const readonly = { type: Boolean } as const

export const spacing = { type: Number } as const

export const configurable = { type: [Array, String, Number, Object, undefined] as PropType<ConfigurableValue> } as const

export const overrideProps = (props: ComponentObjectPropsOptions, propOverrides?: Partial<ComponentObjectPropsOptions>) => propOverrides ? defu(propOverrides, props) : props

// TODO: Use this prop merger
export const defuProps = createDefu((obj, key, value) => {
  // If merging type => Just override the existing type
  if (key === 'type') {
    obj[key] = value

    return true
  }

  // Remove default value if `required: true` is passed
  else if (key === 'required' && value) {
    delete obj.default

    // Assign required as usual
    obj[key] = value

    return true
  }
})
