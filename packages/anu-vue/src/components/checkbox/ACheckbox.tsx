import { color } from '@/composables/useProps'
import { isEleDisabled } from '@/utils/dom'
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue'

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
  },
  setup(props, { slots, attrs, emit }) {
    const elementId = `a-checkbox-${attrs.id || attrs.value || Math.floor(Math.random() * 1000)}`
    const data = useVModel(props, 'modelValue', emit)

    return () => <label class={['inline-flex items-center cursor-pointer']} for={elementId}>
            {/* TODO: Once we support custom values and value related customization try to omit classes like next:checked:xxx so we can omit them in safelist */}
            <input
                {...attrs}
                id={elementId}
                type="checkbox"
                v-model={data.value}
                class={['hidden children:next:checked:scale-full', `next:checked:bg-${props.color} next:checked:border-${props.color}`]}
            />
            <div class={[
              'h-5 w-5 border-(2 app rounded)  flex items-center justify-center shrink-0 transition transition-border duration-200 mr-2',
                `${isEleDisabled(attrs) ? 'border-dashed' : 'border-solid'}`,
            ]}>
                <i class={[props.icon, 'shrink-0 scale-0 transition duration-150 delay-100 ease-[cubic-bezier(.57,1.48,.87,1.09)] text-white']} />
            </div>
            {slots.default ? slots.default() : props.label}
        </label>
  },
})

export type ACheckbox = InstanceType<typeof ACheckbox>
