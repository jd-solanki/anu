import { defineComponent } from 'vue'
import { ABaseInput, useBaseInputProp } from '@/components/base-input'

export const AInput = defineComponent({
  name: 'AInput',
  props: {
    ...useBaseInputProp(),

    /**
     * Bind v-model value
     */
    modelValue: {
      type: String,
      default: undefined,
    },
  },
  emits: ['input', 'update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const isInputTypeFile = attrs.type && attrs.type === 'file'

    const handleChange = (e: InputEvent) => {
      const val = (e.target as HTMLInputElement).value
      emit('input', val)
      emit('update:modelValue', val)
    }

    return () => <ABaseInput disabled={props.disabled} readonly={props.readonly} {...attrs}>
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
