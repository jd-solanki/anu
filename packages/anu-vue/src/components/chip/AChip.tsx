import type { PropType } from 'vue'
import { computed, defineComponent, toRef } from 'vue'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { disabled } from '@/composables/useProps'

export const AChip = defineComponent({
  name: 'AChip',
  props: {
    /*
      ℹ️ If we want volar to infer the correct default values for prop we need to enable below three lines because volar can't generate correct data for dynamic code
      Please refer to this gen-component-meta script's useful links for more details
    */
    // color: { default: 'primary' },
    // variant: { default: 'fill' },
    ...useLayerProps({
      color: {
        default: 'primary',
      },
      variant: {
        default: 'light',
      },
    }),

    /**
     * Bind v-model value to show/hide the chip.
     */
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: true,
    },

    /**
     * Allow to close chip
     */
    closable: {
      type: Boolean,
      default: false,
    },

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
     * Disable state of component
     */
    disabled,
  },
  emits: ['update:modelValue', 'click:close', 'click:appendIcon'],

  // emit on click
  setup(props, { slots, attrs, emit }) {
    const { getLayerClasses } = useLayer()

    const isClickable = computed(() => attrs.onClick !== undefined)

    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      toRef(props, 'variant'),
      isClickable,
    )

    const closeChip = () => {
      emit('update:modelValue', false)
      emit('click:close')
    }

    return () =>
      props.modelValue
        ? <div class={['a-chip', { 'a-chip-disabled': props.disabled, 'cursor-pointer': isClickable.value }, ...classes.value]} style={styles.value}>
            { props.icon ? <i class={props.icon}></i> : null }
            { slots.default?.() }
            { props.appendIcon ? <i class={props.appendIcon}></i> : null }
            { props.closable ? <i onClick={closeChip} class={'i-bx-x hover:i-bx-bxs-x-circle hover:opacity-70 cursor-pointer'}></i> : null }
          </div>
        : null
  },
})

export type AChip = InstanceType<typeof AChip>
