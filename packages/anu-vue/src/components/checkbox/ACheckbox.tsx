import { useVModel } from '@vueuse/core'
import type { PropType } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { color, disabled } from '@/composables/useProps'

export const ACheckbox = defineComponent({
  name: 'ACheckbox',
  props: {
    /**
     * Checkbox color
     */
    // eslint-disable-next-line vue/require-prop-types
    color: {
      ...color,
      default: 'primary',
    },

    /**
     * Bind v-model value to check/uncheck the checkbox.
     */
    modelValue: {
      type: [Boolean, Array, Set] as PropType<boolean | unknown[] | Set<unknown>>,
      default: undefined,
    },

    /**
     * Label text
     */
    label: {
      type: String,
      default: undefined,
    },

    /**
     * Icon to render in checkbox square instead of check
     */
    icon: {
      type: String,
      default: 'i-bx-check',
    },

    /**
     * Disable checkbox
     */
    disabled,
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs, emit }) {
    const elementId = `a-checkbox-${attrs.id || attrs.value}-${Math.random().toString(36).slice(2, 7)}`
    const data = useVModel(props, 'modelValue', emit)

    // Template refs
    const refCheckbox = ref()

    const icon = ref('')

    watch([data, () => props.indeterminate], ([checked, indeterminate], [_, prevIndeterminate]) => {
      // Set indeterminate state of HTMLInputElement
      if (refCheckbox.value)
        refCheckbox.value.indeterminate = indeterminate

      icon.value = !indeterminate && (!prevIndeterminate || checked) ? props.icon : 'i-bx-minus'
    }, { immediate: true })

    const state = computed(() => {
      return typeof data.value === 'boolean'
        ? data.value
        : Array.isArray(data.value)
          ? data.value.includes(attrs.value)
          : data.value?.has(attrs.value) // For Set type
    })

    return () => <label class={['inline-flex items-center cursor-pointer', props.disabled && 'a-checkbox-disabled pointer-events-none']} for={elementId}>
            {/* TODO: Once we support custom values and value related customization try to omit classes like next:checked:xxx so we can omit them in safelist */}
            <input
                {...attrs}
                ref={refCheckbox}
                id={elementId}
                type="checkbox"
                v-model={data.value}
                class="hidden"
            />
            <div class={['a-checkbox-box flex items-center justify-center shrink-0', (props.indeterminate || state.value) && `bg-${props.color} border-${props.color} children:scale-full`]}>
                <i class={[icon.value, 'a-checkbox-icon scale-0 text-white']} />
            </div>
            {slots.default ? slots.default() : props.label}
        </label>
  },
})

export type ACheckbox = InstanceType<typeof ACheckbox>
