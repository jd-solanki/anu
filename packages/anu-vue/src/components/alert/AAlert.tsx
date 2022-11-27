import { defineComponent, ref, toRef, watch } from 'vue'
import { useLayer, useProps as useLayerProps } from '@/composables/useLayer'
import { spacingProp, useSpacing } from '@/composables/useSpacing'

export const AAlert = defineComponent({
  name: 'AAlert',
  props: {
    spacing: spacingProp,
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
     * append (close) icon
     */
    appendIcon: {
      type: String,
      default: undefined,
    },

    /**
     * Make alert dismissible using this prop. Adds close icon as appended icon.
     */
    dismissible: {
      type: Boolean,
      default: false,
    },

    /**
     * Hide/Show alert based on v-model value
     */
    modelValue: {
      type: Boolean,
      default: null,
    },
  },
  emits: ['click:appendIcon', 'update:modelValue'],
  setup(props, { slots, emit }) {
    const spacing = useSpacing(toRef(props, 'spacing'))
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
    const handleAppendIconClick = () => {
      // If alert is dismissible remove/close alert
      if (props.dismissible)
        isAlertVisible.value = false

      // Emit append icon click event
      emit('click:appendIcon')
    }

    // TODO: Omit writing `props.modelValue ??` multiple times
    return () => (
      <div
        class={['a-alert items-start w-full', props.modelValue ?? isAlertVisible.value ? 'flex' : 'hidden', ...classes.value]}
        style={[...styles.value, { '--a-spacing': spacing.value / 100 }]}
      >
        {/* ℹ️ We need div as wrapper with span having `vertical-align: text-top` to center the icon with the text */}
        {props.icon
          ? <div>
            <span class={props.icon} />
          </div>
          : null}
        <div class="flex-grow">
          {slots.default?.()}
        </div>
        {
        appendIcon
          ? <div>
            <span
              class={['align-text-top', appendIcon, { 'cursor-pointer': props.dismissible }]}
              onClick={handleAppendIconClick}
            />
          </div>
          : null
      }
      </div>
    )
  },
})

export type AAlert = InstanceType<typeof AAlert>
