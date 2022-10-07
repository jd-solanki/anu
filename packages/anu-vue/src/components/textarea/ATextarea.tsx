import { defineComponent } from 'vue'
import { ABaseInput, useBaseInputProp } from '@/components/base-input'

export const ATextarea = defineComponent({
  name: 'ATextarea',
  props: {
    modelValue: {
      type: String,
      default: undefined,
    },
    height: {
      type: String,
      default: undefined,
    },
    ...useBaseInputProp(),
  },
  setup(props, { slots, emit, attrs }) {
    return () => <ABaseInput disabled={props.disabled} readonly={props.readonly} {...attrs} inputWrapperClasses={['min-h-32', props.height]}>
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
