import type { ComponentObjectPropsOptions } from 'vue'
import { useProps as useLayerProps } from '@/composables/useLayer'
import { useTypographyProps } from '@/composables/useTypography'
export { ACard } from './ACard'

export const useCardProps = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  const props = {
    ...useLayerProps({
      variant: {
        default: 'light',
      },
    }),
    ...useTypographyProps(),
    img: String,
  }

  // Add `defaults` property in `props` if it is provided via `defaults` argument
  if (propOverrides)
    Object.assign(props, propOverrides)

  return props
}
