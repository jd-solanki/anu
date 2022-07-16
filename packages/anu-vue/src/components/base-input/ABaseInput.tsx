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
    return () => <div class={['a-base-input-root i:children:focus-within:text-primary flex flex-col flex-grow flex-shrink-0', rootClasses ?? []]} ref={refRoot}>
            {/* 👉 Label */}
            {
                slots.label
                  ? slots.label?.()
                  : props.label
                    ? <label for={elementId} class={['a-base-input-label', props.error ? 'text-danger' : null]}>{props.label}</label>
                    : null
            }

            <div ref={refInputContainer} class="a-base-input-input-container flex items-center" {...props.inputContainerAttrs}>
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
                    'a-base-input-input-wrapper relative i:focus-within:text-primary items-center border border-solid border-a-border w-full',
                    props.inputWrapperClasses,
                ]}>

                    {/* 👉 Slot: Prepend Inner */}
                    {
                        slots['prepend-inner']
                          ? slots['prepend-inner']?.()
                          : props.prependInnerIcon
                            ? <i class={['a-base-input-prepend-inner-icon inline-block', iconTransition, props.prependInnerIcon]} />
                            : null
                    }

                    {/* 👉 Slot: Default */}
                    {slots.default?.({
                      class: [
                        'absolute inset-0 rounded-inherit',
                        slots['prepend-inner'] || props.prependInnerIcon ? 'a-base-input-w-prepend-inner' : 'a-base-input-wo-prepend-inner',
                        slots['append-inner'] || props.appendInnerIcon ? 'a-base-input-w-append-inner' : 'a-base-input-wo-append-inner',
                        `${isEleDisabled(attrs) ? 'a-base-input-disabled' : ''}`,
                        `${isEleInteractive(attrs) ? 'a-base-input-interactive' : ''}`,
                      ],
                      ...inputAttrs,
                      id: elementId,
                    })}

                    {/* 👉 Slot: Append Inner */}
                    {
                        slots['append-inner']
                          ? slots['append-inner']?.()
                          : props.appendInnerIcon
                            ? <i class={['a-base-input-append-inner-icon inline-block ml-auto', iconTransition, props.appendInnerIcon]} />
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
                        <small class={`inline-block ${props.error ? 'text-danger' : 'text-light-emphasis'}`}>{props.error || props.hint}</small>
                    </div>
                  </TransitionExpand>
            }
        </div>
  },
})

export type ABaseInput = InstanceType<typeof ABaseInput>
