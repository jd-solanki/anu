import type { ComponentObjectPropsOptions } from 'vue'
import { disabled, readonly } from '@/composables/useProps'
export { ABaseInput } from './ABaseInput'

export const useBaseInputProp = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  const props = {
    /**
     * Disable component
     */
    disabled,

    /**
     * Make component read only
     */
    readonly,
  }

  // Add `defaults` property in `props` if it is provided via `defaults` argument
  if (propOverrides)
    Object.assign(props, propOverrides)

  return props
}
