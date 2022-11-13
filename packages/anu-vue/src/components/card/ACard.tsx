import { defineComponent, toRef } from 'vue'
import { ATypography } from '../typography'
import type { ConfigurableValue } from '@/composables/useConfigurable'
import { useConfigurable } from '@/composables/useConfigurable'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { spacingProp, useSpacing } from '@/composables/useSpacing'
import { isTypographyUsed, useTypographyProps } from '@/composables/useTypography'

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

    // TODO [v0.2.0]: Find another way to check typography component usage
    // TODO: Check => Do we need to pass toRefs(props)
    const _isTypographyUsed = isTypographyUsed(props, slots)

    // Modify text prop to have `text-sm`
    const _textProp = useConfigurable(toRef(props, 'text'))
    if (Array.isArray(_textProp.value.classes))
      _textProp.value.classes = [..._textProp.value.classes, 'uno-layer-base-text-sm']
    else
      _textProp.value.classes += ' uno-layer-base-text-sm'

    return () => <div style={[...styles.value, { '--a-spacing': spacing.value / 100 }]} class={['a-card overflow-hidden uno-layer-base-bg-[hsl(var(--a-layer))]', ...classes.value]}>
      {/* 👉 Image */}
      {props.img ? <img src={props.img} alt="card-img"></img> : null}

      {/* 👉 Typography */}
      {
        _isTypographyUsed
          ? <div class="a-card-typography-wrapper">
            <ATypography title={props.title} subtitle={props.subtitle} text={Object.values(_textProp.value) as ConfigurableValue}>
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
