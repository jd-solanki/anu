import { useLayer, useProps as useLayerProps } from '@/composables/useLayer';
import { extractTypographyProp, isTypographyUsed, useTypographyProps } from '@/composables/useTypography';
import { defineComponent } from 'vue';
import { ATypography } from '../typography';

export const ACard = defineComponent({
  name: 'ACard',
  props: {
    ...useLayerProps({
      variant: {
        default: 'light',
      },
    }),
    ...useTypographyProps(),
    img: String,
  },
  setup(props, { slots, emit }) {
    const { getLayerClasses } = useLayer()
    const typographyProps = extractTypographyProp(props)

    // TODO [v0.2.0]: Find another way to check typography component usage
    const _isTypographyUsed = isTypographyUsed(props)


    // Modify text prop to have `text-sm`
    const propText = typographyProps.text
    if (propText) {
      if (typeof propText === 'string') typographyProps.text = [propText, 'text-sm']
      else {
        const [textContent, textClasses] = propText
        typographyProps.text = [textContent, textClasses + ' text-sm']
      }
    }

    return () => <div class={['overflow-hidden text-sm rounded-lg uno-layer-base-bg-[hsl(var(--layer))] shadow-lg', getLayerClasses(props)]}>
      {/* 👉 Image */}
      {props.img ? <img src={props.img} alt="card-img"></img> : null}

      {/* 👉 Typography */}
      {/* TODO: Improve usage of components inside another component */}
      {
        _isTypographyUsed
          // `not-last:pb-4` will set bottom padding to 1 rem instead of 1.5 if card-spacer is not last of type
          ? <div class="card-spacer next:pt-0 not-last:pb-4">
            <ATypography {...typographyProps}>
              {{ ...slots, default: null }}
            </ATypography>
          </div>
          : null
      }

      {/* 👉 Default slot */}
      {slots.default?.()}
    </div>
  },
})

export type ACard = InstanceType<typeof ACard>
