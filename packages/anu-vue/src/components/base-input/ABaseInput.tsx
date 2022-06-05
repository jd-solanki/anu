import { defineComponent, PropType } from 'vue';

export const ABaseInput = defineComponent({
    name: 'ABaseInput',
    props: {
        inputContainerClasses: [Array, String, Object] as PropType<string | string[] | object>,
        inputWrapperClasses: [Array, String, Object] as PropType<string | string[] | object>,
        hint: String,
        error: String,
        label: String,
        prependIcon: String,
        appendIcon: String,
        prependInnerIcon: String,
        appendInnerIcon: String,
    },
    setup(props, { slots, attrs }) {
        const elementId = attrs.id || props.label ? `a-input-${attrs.id || props.label}` : undefined

        return () => <div class={["flex flex-col gap-y-1", props.inputContainerClasses]}>
            {/* 👉 Label */}
            {
                slots.label
                    ? slots.label?.()
                    : props.label
                        ? <label for={elementId}>{props.label}</label>
                        : null
            }

            <div class="flex i:flex-shrink-0 i:w-6 i:h-6 gap-x-3 items-center">
                {/* 👉 Slot: Prepend */}
                {
                    slots.prepend
                        ? slots.prepend?.()
                        : props.prependIcon
                            ? <i class={props.prependIcon} />
                            : null
                }

                {/* SECTION Input wrapper */}
                <div class={['focus-within:border-primary transition duration-250 ease-out flex i:flex-shrink-0 i:w-5 i:h-5 gap-x-2 items-center h-12 border border-solid border-[hsl(var(--border-color))] w-full rounded-lg', slots['prepend-inner'] ? 'pl-3' : 'pl-4', slots['append-inner'] ? 'pr-3' : 'pr-4', props.inputWrapperClasses]}>

                    {/* 👉 Slot: Prepend Inner */}
                    {
                        slots['prepend-inner']
                            ? slots['prepend-inner']?.()
                            : props.prependInnerIcon
                                ? <i class={props.prependInnerIcon} />
                                : null
                    }

                    {/* 👉 Slot: Default */}
                    {slots.default?.({
                        class: `w-full h-full ${attrs.hasOwnProperty('disabled') ? 'bg-gray-200 opacity-50' : ''}`,
                        ...attrs,
                        id: elementId,
                    })}

                    {/* 👉 Slot: Append Inner */}
                    {
                        slots['append-inner']
                            ? slots['append-inner']?.()
                            : props.appendInnerIcon
                                ? <i class={props.appendInnerIcon} />
                                : null
                    }
                </div>
                {/* !SECTION */}

                {/* 👉 Slot: Append */}
                {
                    slots.append
                        ? slots.append?.()
                        : props.appendIcon
                            ? <i class={props.appendIcon} />
                            : null
                }
            </div>
            {/* 👉 Slot: Bottom */}
            {
                slots.bottom
                    ? slots.bottom?.()
                    : <div class="h-8">
                        {
                            props.error || props.hint
                                ? <small class={`inline-block ${props.error ? 'text-danger' : 'text-gray-400'}`}>{props.error || props.hint}</small>
                                : null
                        }
                    </div>
            }
        </div>
    },
})

export type ABaseInput = InstanceType<typeof ABaseInput>
