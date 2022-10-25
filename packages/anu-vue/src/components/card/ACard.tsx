import { defineComponent, reactive, toRef, toRefs } from 'vue'
import { ATypography } from '../typography'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { spacingProp, useSpacing } from '@/composables/useSpacing'
import { extractTypographyProp, isTypographyUsed, useTypographyProps } from '@/composables/useTypography'

export const ACard = defineComponent({
  name: 'ACard',
  props: {
    spacing: spacingProp,
    ...useLayerProps({
      variant: {
        default: 'text',
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
  },
  setup(props, { slots }) {
    const spacing = useSpacing(toRef(props, 'spacing'))
    const { getLayerClasses } = useLayer()
    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      toRef(props, 'variant'),
      toRef(props, 'states'),
    )

    const typographyProps = extractTypographyProp<typeof props>(toRefs(props))

    // TODO [v0.2.0]: Find another way to check typography component usage
    // TODO: Check => Do we need to pass toRefs(props)
    const _isTypographyUsed = isTypographyUsed(props, slots)

    // Modify text prop to have `text-sm`
    const propText = typographyProps.text?.value
    if (propText) {
      if (typeof propText === 'string') { typographyProps.text.value = [propText, 'text-sm'] }
      else {
        const [textContent, textClasses] = propText as string[]
        typographyProps.text.value = [textContent, `${textClasses} text-sm`]
      }
    }

    return () => <div style={{ '--a-spacing': spacing.value / 100 }} class={['a-card overflow-hidden uno-layer-base-bg-[hsl(var(--a-layer))]', ...classes.value]} style={[...styles.value]}>
      {/* 👉 Image */}
      {props.img ? <img src={props.img} alt="card-img"></img> : null}

      {/* 👉 Typography */}
      {/* TODO: Improve usage of components inside another component */}
      {
        _isTypographyUsed

          // `not-last:pb-4` will set bottom padding to 1 rem instead of 1.5 if card-padding is not last of type
          ? <div class="a-card-typography-wrapper">
            <ATypography {...reactive(typographyProps)}>
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
