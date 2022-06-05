import { defineComponent, PropType } from 'vue'

export const ABaseInput = defineComponent({
    name: 'ABaseInput',
    props: {
        modelValue: String,
        hint: String,
        error: String,
        inputWrapperClasses: [Array, String, Object] as PropType<string | string[] | object>,
    },
    setup(props, { slots, attrs }) {
        return () => <>
            <div class="flex i:flex-shrink-0 i:w-6 i:h-6 gap-x-4 items-center" {...attrs}>
                {slots.prepend?.()}
                <div class={['flex i:flex-shrink-0 i:w-5 i:h-5 gap-x-2 items-center h-12 border border-solid border-[hsl(var(--border-color))] w-full rounded-lg', slots['prepend-inner'] ? 'pl-3' : 'pl-4', slots['append-inner'] ? 'pr-3' : 'pr-4', props.inputWrapperClasses]}>
                    {slots['prepend-inner']?.()}
                    {slots.default?.({
                        class: 'w-full h-full',
                    })}
                    {slots['append-inner']?.()}
                </div>
                {slots.append?.()}
            </div>
            {
                slots.bottom
                    ? slots.bottom?.()
                    : <div class="h-8">
                        {
                            props.error || props.hint
                                ? <small class={`inline-block py-1 ${props.error ? 'text-danger' : 'text-gray-400'}`}>{props.error || props.hint}</small>
                                : null
                        }
                    </div>
            }
        </>
    },
})

export type ABaseInput = InstanceType<typeof ABaseInput>
