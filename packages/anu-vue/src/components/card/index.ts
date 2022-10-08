import type { ComponentObjectPropsOptions } from 'vue'
import { useProps as useLayerProps } from '@/composables/useLayer'
import { useTypographyProps } from '@/composables/useTypography'
export { ACard } from './ACard'

// TODO: Use this card props in component as well
export const useCardProps = (propOverrides?: Partial<ComponentObjectPropsOptions>) => {
  const props = {
    ...useLayerProps({
      variant: {
        default: 'light',
      },
    }),

    ...useTypographyProps(),

    /**
     * Render image at the top of the card (_above header_)
     */
    img: {
      type: String,
      default: undefined,
    },
  }

  // Add `defaults` property in `props` if it is provided via `defaults` argument
  if (propOverrides)
    Object.assign(props, propOverrides)

  return props
}
