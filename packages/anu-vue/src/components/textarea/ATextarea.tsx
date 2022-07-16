import { ABaseInput } from '@/components/base-input'
import { defineComponent } from 'vue'

export const ATextarea = defineComponent({
  name: 'ATextarea',
  props: {
    modelValue: String,
    height: String,
  },
  setup(props, { slots, emit, attrs }) {
    return () => <ABaseInput {...attrs} inputWrapperClasses={['min-h-32', props.height]}>
            {{
              // Recursively pass down slots
              ...slots,
              default: (slotProps: any) =>
                    <textarea
                        {...slotProps}
                        value={props.modelValue}
                        onInput={(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)}
                        class="a-textarea bg-transparent resize-none"
                    />,
            }}
        </ABaseInput >
  },
})

export type ATextarea = InstanceType<typeof ATextarea>
