import { ABaseInput } from '@/components/base-input';
import { defineComponent } from 'vue';

export const AInput = defineComponent({
    name: 'AInput',
    props: {
        modelValue: String,
    },
    setup(props, { slots, emit, attrs }) {
        const isInputTypeFile = attrs.type && attrs.type === 'file'

        return () => <ABaseInput {...attrs} input-wrapper-classes={isInputTypeFile ? '!px-0' : null}>
            {{
                // Recursively pass down slots
                ...slots,
                default: (slotProps: any) =>
                    <input
                        {...slotProps}
                        value={props.modelValue}
                        onInput={(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)}
                        class={isInputTypeFile ? "file:rounded-lg file:border-none file:mr-4 file:px-4 file:py-3 file:text-gray-500 file:rounded-r-none file:bg-gray-100" : null}
                    />
            }}
        </ABaseInput >
    },
})

export type AInput = InstanceType<typeof AInput>
