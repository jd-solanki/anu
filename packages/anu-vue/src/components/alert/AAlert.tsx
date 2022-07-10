import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { defineComponent, ref, watch } from 'vue'

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
    icon: {
      type: String,
    },
    appendIcon: {
      type: String,
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
    // TODO: Remove usage of `i:flex-shrink-0` from everywhere because icons now have flex-shrink 0 by default
    return () => <div class={['alert items-start i:flex-shrink-0 w-full', props.modelValue ?? isAlertVisible.value ? 'flex' : 'hidden', ...getLayerClasses(props)]}>
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
