import type { ComponentObjectPropsOptions } from 'vue'
import { disabled, readonly } from '@/composables/useProps'
export { default as ABaseInput } from './ABaseInput.vue'
export * from './props'

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
