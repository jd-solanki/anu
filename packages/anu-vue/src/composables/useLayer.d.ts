import type { ComponentObjectPropsOptions } from 'vue'

export declare const useProps: (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  color: {
    type: StringConstructor
    validator: (value: string) => boolean
  }
  variant: {
    type: StringConstructor
    validator: (value: string) => boolean
  }
}
export declare const useLayer: () => {
  getLayerClasses: (props: ComponentObjectPropsOptions) => string[]
}
