import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue'
import { color, disabled } from '@/composables/useProps'

export const ACheckbox = defineComponent({
  name: 'ACheckbox',
  props: {
    color: {
      ...color,
      default: 'primary',
    },
    modelValue: [Boolean, Array, Set],
    label: String,
    icon: {
      type: String,
      default: 'i-bx-check',
    },
    disabled,
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs, emit }) {
    const elementId = `a-checkbox-${attrs.id || attrs.value || Math.random().toString(36).slice(2, 7)}`
    const data = useVModel(props, 'modelValue', emit)

    return () => <label class={['inline-flex items-center cursor-pointer', props.disabled && 'a-checkbox-disabled pointer-events-none']} for={elementId}>
            {/* TODO: Once we support custom values and value related customization try to omit classes like next:checked:xxx so we can omit them in safelist */}
            <input
                {...attrs}
                id={elementId}
                type="checkbox"
                v-model={data.value}
                class={['hidden children:next:checked:scale-full', `next:checked:bg-${props.color} next:checked:border-${props.color}`]}
            />
            <div class={['a-checkbox-box flex items-center justify-center shrink-0']}>
                <i class={[props.indeterminate ? 'i-bx-minus' : props.icon, 'a-checkbox-icon scale-0 text-white']} />
            </div>
            {slots.default ? slots.default() : props.label}
        </label>
  },
})

export type ACheckbox = InstanceType<typeof ACheckbox>
