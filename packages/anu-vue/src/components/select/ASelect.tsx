import { ABaseInput } from '@/components/base-input'
import { isObject } from '@/utils/helpers'
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { onClickOutside } from '@vueuse/core'
import type { PropType } from 'vue'
import { defineComponent, onBeforeUnmount, onMounted, ref, Teleport, watch } from 'vue'

type SelectOptions = unknown[] | ({ label: string; value: unknown } & Record<string | number | symbol, unknown>)[]

export const ASelect = defineComponent({
  name: 'ASelect',
  props: {
    modelValue: {
      required: false,
    },
    options: {
      type: Array as PropType<SelectOptions>,
      default: undefined,
    },
    optionsWrapperClasses: {
      type: [Array, String, Object] as PropType<string | string[] | object>,
      default: '',
    },
  },
  emits: ['input', 'update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    // SECTION Floating
    // Template refs
    const refReference = ref()
    const refFloating = ref()

    const isOptionsVisible = ref(false)

    const calculateFloatingPosition = async () => {
      const { x, y } = await computePosition(refReference.value.refInputContainer, refFloating.value, {
        placement: 'bottom-start',
        middleware: [
          offset(6),
          {
            name: 'sameWidth',
            fn: ({ rects, x, y }) => {
              // Set width of reference to floating
              refFloating.value.style.width = `${rects.reference.width}px`

              return { x, y }
            },
          },
          flip(),
          shift({ padding: 10 }),
        ],
      })

      Object.assign(refFloating.value.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    }

    let floatingUiCleanup: Function = () => { }
    onMounted(() => {
      floatingUiCleanup = autoUpdate(refReference.value.refInputContainer, refFloating.value, calculateFloatingPosition)
    })
    onBeforeUnmount(() => floatingUiCleanup())

    onClickOutside(
      refFloating,
      event => {
        if (isOptionsVisible.value)
          isOptionsVisible.value = false
      },
      {
        ignore: [refReference],
      },
    )

    // !SECTION

    // 👉 watch: modelValue
    watch(
      () => props.modelValue,
      () => {
        isOptionsVisible.value = false
      },
    )

    // TODO: You can use it as utility in another components
    // TODO: Add some style to indicate currently selected item
    const isEleInteractive = Object.prototype.hasOwnProperty.call(attrs, 'disabled') || Object.prototype.hasOwnProperty.call(attrs, 'readonly')
    const openOptions = () => {
      if (!isEleInteractive)
        isOptionsVisible.value = !isOptionsVisible.value
    }

    // 👉 Options
    const optionClasses = 'em:px-4 em:py-1 states before:transition-none cursor-pointer text-ellipsis overflow-hidden'
    const handleOptionClick = (option: unknown) => {
      emit('input', option)
      emit('update:modelValue', option)
    }

    // TODO: If we click on arrow down icon then select don't get primary border
    return () => <>
            {/* TODO: Make sure we don't bind input's `type` attr here */}
            <ABaseInput appendInnerIcon="i-bx-chevron-down" {...attrs} ref={refReference} inputContainerAttrs={{
              onClick: openOptions,
            }}>
                {{
                  // Recursively pass down slots
                  ...slots,
                  default: (slotProps: any) =>
                        <input
                            {...slotProps}
                            value={isObject(props.modelValue) && 'label' in props.modelValue && 'value' in props.modelValue ? (props.modelValue.label) : props.modelValue }
                            readonly
                        />,
                }}
            </ABaseInput>
            <Teleport to="body">
                <ul
                    v-show={isOptionsVisible.value}
                    ref={refFloating}
                    class={['z-10 g-select-options absolute bg-[hsl(var(--a-layer))] border border-solid border-a-border m-0 rounded-lg em:py-3 shadow-lg', props.optionsWrapperClasses]}>
                    {
                      slots.default
                        ? slots.default?.({
                          attrs: {
                            class: optionClasses,
                          },
                        })
                        : props.options?.map(option => <li class={optionClasses} onClick={() => handleOptionClick(option)}>
                          {isObject(option) && 'label' in option && 'value' in option ? option.label : option}
                        </li>)
                    }
                </ul>
            </Teleport>
        </>
  },
})

export type ASelect = InstanceType<typeof ASelect>
