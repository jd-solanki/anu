import type { PropType } from 'vue'
import { defineComponent, ref, toRef } from 'vue'
import { disabled, readonly } from '@/composables/useProps'
import { spacingProp, useSpacing } from '@/composables/useSpacing'
import TransitionExpand from '@/transitions/TransitionExpand.vue'

export const ABaseInput = defineComponent({
  name: 'ABaseInput',
  inheritAttrs: false,
  props: {
    spacing: spacingProp,
    inputWrapperClasses: [Array, String, Object] as PropType<string | string[] | object>,
    inputContainerAttrs: Object,
    hint: String,
    error: String,
    label: String,
    prependIcon: String,
    appendIcon: String,
    prependInnerIcon: String,
    appendInnerIcon: String,
    disabled,
    readonly,
  },
  emits: ['click:inputWrapper'],
  setup(props, { attrs, slots, expose, emit }) {
    const spacing = useSpacing(toRef(props, 'spacing'))
    const iconTransition = 'transition duration-150 ease -in'
    const elementId = attrs.id || props.label ? `a-input-${attrs.id || props.label}-${Math.random().toString(36).slice(2, 7)}` : undefined

    const refRoot = ref()
    const refInputContainer = ref()
    expose({
      refRoot,
      refInputContainer,
    })

    // TODO(Enhancement): We might need to remove absolute added to html input element to retain width instead of providing min-w to below wrapper
    // TODO: We need to improve default slot implementation so that we can provide selected slot to selection component
    return () => <div style={{ '--a-spacing': spacing.value / 100 }} class={['a-base-input-root i:children:focus-within:text-primary flex flex-col flex-grow flex-shrink-0', attrs.class ?? [], props.disabled && 'a-base-input-disabled ', (props.disabled || props.readonly) && 'pointer-events-none', !(props.disabled || props.readonly) && 'a-base-input-interactive']} ref={refRoot}>
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
                <div onClick={() => { emit('click:inputWrapper') }} class={[
                    `${props.error ? 'border-danger' : 'focus-within:border-primary'}`,
                    'a-base-input-input-wrapper cursor-text em:spacing:px-4 spacing:gap-x-2 relative i:focus-within:text-primary items-center border border-solid border-a-border w-full',
                    props.inputWrapperClasses,
                ]}>

                    {/* 👉 Slot: Prepend Inner */}
                    {
                        slots['prepend-inner']
                          ? slots['prepend-inner']?.()
                          : props.prependInnerIcon
                            ? <i class={['a-base-input-prepend-inner-icon', iconTransition, props.prependInnerIcon]} />
                            : null
                    }

                    {/* 👉 Slot: Default */}
                    {slots.default?.({
                      ...attrs,
                      class: [
                        'a-base-input-child w-full h-full inset-0 rounded-inherit bg-transparent',
                        slots['prepend-inner'] || props.prependInnerIcon ? 'a-base-input-w-prepend-inner' : 'a-base-input-wo-prepend-inner',
                        slots['append-inner'] || props.appendInnerIcon ? 'a-base-input-w-append-inner' : 'a-base-input-wo-append-inner',
                      ],
                      id: elementId,
                    })}

                    {/* 👉 Slot: Append Inner */}
                    {
                        slots['append-inner']
                          ? slots['append-inner']?.()
                          : props.appendInnerIcon
                            ? <i class={['a-base-input-append-inner-icon ml-auto', iconTransition, props.appendInnerIcon]} />
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
