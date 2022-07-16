import { ABaseInput } from '@/components/base-input'
import { defineComponent } from 'vue'

export const AInput = defineComponent({
  name: 'AInput',
  props: {
    modelValue: String,
  },
  emits: ['input', 'update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const isInputTypeFile = attrs.type && attrs.type === 'file'

    const handleChange = (e: InputEvent) => {
      const val = (e.target as HTMLInputElement).value
      emit('input', val)
      emit('update:modelValue', val)
    }

    return () => <ABaseInput {...attrs}>
            {{
              // Recursively pass down slots
              ...slots,
              default: (slotProps: any) => <input
                    {...slotProps}
                    value={props.modelValue}
                    class={isInputTypeFile && 'a-input-type-file'}
                    onInput={handleChange}
                />,
            }}
        </ABaseInput >
  },
})

export type AInput = InstanceType<typeof AInput>
