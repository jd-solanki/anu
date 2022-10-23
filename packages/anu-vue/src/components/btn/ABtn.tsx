import { defineComponent, toRef } from 'vue'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { disabled } from '@/composables/useProps'

export const ABtn = defineComponent({
  name: 'ABtn',
  props: {
    /*
      ℹ️ If we want volar to infer the correct default values for prop we need to enable below three lines because volar can't generate correct data for dynamic code
      Please refer to this gen-component-meta script's useful links for more details
    */
    // color: { default: 'primary' },
    // variant: { default: 'fill' },
    // states: { default: true },
    ...useLayerProps({
      color: {
        default: 'primary',
      },
      variant: {
        default: 'fill',
      },
      states: {
        default: true,
      },
    }),

    /**
     * prepend icon
     */
    icon: {
      type: String,
      default: undefined,
    },

    /**
     * append icon
     */
    appendIcon: {
      type: String,
      default: undefined,
    },

    /**
     * create icon only button
     */
    iconOnly: {
      type: Boolean,
      default: false,
    },

    /**
     * Disable state of component
     */
    disabled,
  },
  setup(props, { slots, attrs: _ }) {
    const { getLayerClasses } = useLayer()

    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      toRef(props, 'variant'),
      toRef(props, 'states'),
    )

    // FIX: ABtn gets full width if placed inside flex container
    return () => <button class={[props.iconOnly ? 'a-btn-icon-only' : 'a-btn', 'uno-layer-base-text-base whitespace-nowrap inline-flex justify-center items-center', { 'opacity-50 pointer-events-none': props.disabled }, ...classes.value]} style={[...styles.value]} tabindex={props.disabled ? -1 : 0}>
      {props.icon ? <i class={props.icon}></i> : null}{slots.default?.()}{props.appendIcon ? <i class={props.appendIcon}></i> : null}
    </button>
  },
})

export type ABtn = InstanceType<typeof ABtn>
