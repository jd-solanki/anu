import { defineComponent, ref, toRef, watch } from 'vue'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'

export const AAlert = defineComponent({
  name: 'AAlert',
  props: {
    ...useLayerProps({
      color: {
        default: 'primary',
      },
      variant: {
        default: 'light',
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
     * change append (close) icon
     */
    appendIcon: {
      type: String,
      default: undefined,
    },
    dismissible: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: null,
    },
  },
  setup(props, { slots, emit }) {
    const { getLayerClasses } = useLayer()
    const { styles, classes } = getLayerClasses(
      toRef(props, 'color'),
      toRef(props, 'variant'),
      toRef(props, 'states'),
    )

    const isAlertVisible = ref(props.modelValue ?? true)
    watch(isAlertVisible, val => {
      emit('update:modelValue', val)
    })

    // 👉 Append icon
    const appendIcon = props.appendIcon || (props.dismissible ? 'i-bx-x' : null)
    const handleAppendIconClick = (e: Event) => {
      // If alert is dismissible remove/close alert
      if (props.dismissible)
        isAlertVisible.value = false

      // Emit append icon click event
      emit('click:appendIcon')
    }

    // TODO: Omit writing `props.modelValue ??` multiple times
    return () => <div class={['a-alert items-start w-full', props.modelValue ?? isAlertVisible.value ? 'flex' : 'hidden', ...classes.value]} style={[...styles.value]}>
      {props.icon ? <i class={props.icon}></i> : null}
      <div class="flex-grow">{slots.default?.()}</div>
      {
        appendIcon
          ? <i class={[appendIcon, { 'cursor-pointer': props.dismissible }]} onClick={handleAppendIconClick}></i>
          : null
      }
    </div>
  },
})

export type AAlert = InstanceType<typeof AAlert>
