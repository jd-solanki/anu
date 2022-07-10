import TransitionExpand from '@/transitions/TransitionExpand.vue'
import { isEleDisabled, isEleInteractive } from '@/utils/dom'
import type { PropType } from 'vue'
import { defineComponent, ref } from 'vue'

export const ABaseInput = defineComponent({
  name: 'ABaseInput',
  inheritAttrs: false,
  props: {
    inputWrapperClasses: [Array, String, Object] as PropType<string | string[] | object>,
    inputContainerAttrs: Object,
    hint: String,
    error: String,
    label: String,
    prependIcon: String,
    appendIcon: String,
    prependInnerIcon: String,
    appendInnerIcon: String,
  },
  setup(props, { slots, attrs, expose }) {
    const iconTransition = 'transition duration-150 ease -in'
    const elementId = attrs.id || props.label ? `a-input-${attrs.id || props.label}` : undefined

    const refRoot = ref()
    const refInputContainer = ref()
    expose({
      refRoot,
      refInputContainer,
    })

    const { class: rootClasses, ...inputAttrs } = attrs

    // TODO(Enhancement): We might need to remove absolute added to html input element to retain width instead of providing min-w to below wrapper
    // TODO: We need to improve default slot implementation so that we can provide selected slot to selection component
    return () => <div class={['min-w-[181px] i:children:focus-within:text-primary flex flex-col flex-grow flex-shrink-0 gap-y-1', rootClasses ?? []]} ref={refRoot}>
            {/* 👉 Label */}
            {
                slots.label
                  ? slots.label?.()
                  : props.label
                    ? <label for={elementId} class={['a-base-input-label', props.error ? 'text-danger' : null]}>{props.label}</label>
                    : null
            }

            <div ref={refInputContainer} class="flex i:flex-shrink-0 i:em:w-6 i:em:h-6 gap-x-3 items-center" {...props.inputContainerAttrs}>
                {/* 👉 Slot: Prepend */}
                {
                    slots.prepend
                      ? slots.prepend?.()
                      : props.prependIcon
                        ? <i class={[iconTransition, props.prependIcon]} />
                        : null
                }

                {/* SECTION Input wrapper */}
                <div class={[
                    `${props.error ? 'border-danger' : 'focus-within:border-primary'}`,
                    'relative i:focus-within:text-primary transition duration-250 ease-out flex i:flex-shrink-0 i:em:w-5 i:em:h-5 gap-x-2 items-center em:h-12 border border-solid border-[hsla(var(--base-color),var(--border-opacity))] w-full em:rounded-lg',
                    props.inputWrapperClasses,
                ]}>

                    {/* 👉 Slot: Prepend Inner */}
                    {
                        slots['prepend-inner']
                          ? slots['prepend-inner']?.()
                          : props.prependInnerIcon
                            ? <i class={['inline-block ml-3 z-1', iconTransition, props.prependInnerIcon]} />
                            : null
                    }

                    {/* 👉 Slot: Default */}
                    {slots.default?.({
                      class: [
                        'absolute inset-0 rounded-inherit',
                        slots['prepend-inner'] || props.prependInnerIcon ? 'em:pl-10' : 'em:pl-4',
                        slots['append-inner'] || props.appendInnerIcon ? 'em:pr-10' : 'em:pr-4',
                            `${isEleDisabled(attrs) ? 'bg-gray-200 opacity-50' : ''}`,
                            `${isEleInteractive(attrs) ? 'placeholder:transition placeholder:duration-250 placeholder:ease  focus:placeholder:translate-x-1' : ''}`,
                      ],
                      ...inputAttrs,
                      id: elementId,
                    })}

                    {/* 👉 Slot: Append Inner */}
                    {
                        slots['append-inner']
                          ? slots['append-inner']?.()
                          : props.appendInnerIcon
                            ? <i class={['inline-block em:me-3 ml-auto', iconTransition, props.appendInnerIcon]} />
                            : null
                    }
                </div>
                {/* !SECTION */}

                {/* 👉 Slot: Append */}
                {
                    slots.append
                      ? slots.append?.()
                      : props.appendIcon
                        ? <i class={[iconTransition, props.appendIcon]} />
                        : null
                }
            </div>
            {/* 👉 Slot: Bottom */}
            {
                slots.bottom
                  ? slots.bottom?.()
                  : <TransitionExpand>
                      <div class="h-8" v-show={props.error || props.hint}>
                        <small class={`inline-block ${props.error ? 'text-danger' : 'text-gray-400'}`}>{props.error || props.hint}</small>
                    </div>
                  </TransitionExpand>
            }
        </div>
  },
})

export type ABaseInput = InstanceType<typeof ABaseInput>
