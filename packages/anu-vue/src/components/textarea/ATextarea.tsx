import { ABaseInput } from '@/components/base-input'
import { defineComponent } from 'vue'

export const ATextarea = defineComponent({
  name: 'ATextarea',
  props: {
    modelValue: String,
    height: String,
  },
  setup(props, { slots, emit, attrs }) {
    const isInputTypeFile = attrs.type && attrs.type === 'file'

    return () => <ABaseInput {...attrs} inputWrapperClasses={['min-h-32', props.height]}>
            {{
              // Recursively pass down slots
              ...slots,
              default: (slotProps: any) =>
                    <textarea
                        {...slotProps}
                        value={props.modelValue}
                        onInput={(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)}
                        class="py-4 bg-transparent resize-none"
                    />,
            }}
        </ABaseInput >
  },
})

export type ATextarea = InstanceType<typeof ATextarea>
