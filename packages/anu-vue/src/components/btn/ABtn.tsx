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

    /**
     * Set loading state
     */
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs: _ }) {
    const { getLayerClasses } = useLayer()

    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      toRef(props, 'variant'),
      toRef(props, 'states'),
    )

    // FIX: ABtn gets full width if placed inside flex container
    return () => <button class={[props.iconOnly ? 'a-btn-icon-only' : 'a-btn', 'uno-layer-base-text-base whitespace-nowrap inline-flex justify-center items-center', { 'opacity-50 pointer-events-none': props.disabled }, ...classes.value]} style={[...styles.value]}>
      {props.loading && <svg class={['animate-spin h-5 w-5', props.iconOnly ? 'mx-0.5' : '-ml-0.6 mr-0.4']} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>}
      {props.icon && !props.loading ? <i class={props.icon}></i> : null}{slots.default?.()}{props.appendIcon ? <i class={props.appendIcon}></i> : null}
    </button>
  },
})

export type ABtn = InstanceType<typeof ABtn>
