import { defineComponent, ref } from 'vue'
import { ABaseInput, useBaseInputProp } from '@/components/base-input'

export const ATextarea = defineComponent({
  name: 'ATextarea',
  props: {
    /**
     * Bind v-model value to textarea
     */
    modelValue: {
      type: String,
      default: undefined,
    },

    /**
     * Set textarea height.
     */
    height: {
      type: String,
      default: undefined,
    },

    ...useBaseInputProp(),
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const textarea = ref<HTMLTextAreaElement>()

    const handleInputWrapperClick = () => {
      textarea.value?.focus()
    }

    return () => (
      <ABaseInput
        {...attrs}
        disabled={props.disabled}
        inputWrapperClasses={['min-h-32', props.height]}
        onClick:inputWrapper={handleInputWrapperClick}
        readonly={props.readonly}
      >
        {{
        // Recursively pass down slots
          ...slots,
          default: (slotProps: any) =>
            <textarea
              ref={textarea}
              {...slotProps}
              class="a-textarea bg-transparent resize-none"
              onInput={(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)}
              value={props.modelValue}
            />,
        }}
      </ABaseInput >
    )
  },
})

export type ATextarea = InstanceType<typeof ATextarea>
