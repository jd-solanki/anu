import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom'
import { onClickOutside } from '@vueuse/core'
import type { PropType } from 'vue'
import { Teleport, computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { isObject } from '@/utils/helpers'
import { ABaseInput, useBaseInputProp } from '@/components/base-input'

interface ObjectOption { label: string; value: string | number }
type SelectOption = string | number | ObjectOption

export const ASelect = defineComponent({
  name: 'ASelect',
  props: {
    ...useBaseInputProp(),

    /**
     * Bind v-model value to select
     */
    modelValue: {
      type: [String, Number, Object] as PropType<string | number | ObjectOption>,
      default: undefined,
    },

    /**
     * Select options
     */
    options: {
      type: Array as PropType<SelectOption[]>,
      default: undefined,
    },

    /**
     * When object is used as select option, enabling this prop will emit the whole object instead of value from object.
     *
     * When set to `false`: `'vue'`
     *
     * When set to `true`: `{ label: 'VueJS', value: 'vue' }`
     */
    emitObject: {
      type: Boolean,
      default: false,
    },

    /**
     * Add classes to wrapper of select options (_ul tag_)
     */
    optionsWrapperClasses: {
      type: [Array, String, Object] as PropType<string | string[] | object>,
      default: undefined,
    },
  },
  emits: ['input', 'update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    // SECTION Floating
    // Template refs
    const refReference = ref()
    const selectRef = ref<HTMLSelectElement>()
    const refFloating = ref()

    const isObjectOption = (option: SelectOption) => isObject(option) && 'label' in option && 'value' in option
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
      _event => {
        if (isOptionsVisible.value)
          isOptionsVisible.value = false
      },
      {
        ignore: [refReference],
      },
    )

    // !SECTION
    // TODO: You can use it as utility in another components
    // TODO: Add some style to indicate currently selected item
    const handleInputClick = () => {
      if (!(props.disabled || props.readonly)) {
        isOptionsVisible.value = !isOptionsVisible.value
        selectRef.value?.focus()
      }
    }

    // 👉 Options
    const optionClasses = 'a-select-option states before:transition-none cursor-pointer text-ellipsis overflow-hidden'
    const handleOptionClick = (option: SelectOption) => {
      const value = isObjectOption(option) && !props.emitObject ? (option as ObjectOption).value : option
      emit('input', value)
      emit('update:modelValue', value)
    }
    const closeOptions = (event: MouseEvent) => {
      if (event.target !== refFloating.value)
        isOptionsVisible.value = false
    }

    // 👉 Value
    const selectedValue = computed(() => {
      const option = props.options?.find(option => isObjectOption(option)
        ? (option as ObjectOption).value === (!props.emitObject ? props.modelValue : (props.modelValue as ObjectOption).value)
        : option === props.modelValue)

      return option ? isObjectOption(option) ? (option as ObjectOption).label : option : (props.modelValue as ObjectOption | undefined)?.label || ''
    })

    return () => <>
            {/* TODO: Make sure we don't bind input's `type` attr here */}
            <ABaseInput disabled={props.disabled} readonly={props.readonly} appendInnerIcon="i-bx-chevron-down" {...attrs} ref={refReference} inputContainerAttrs={{
              onClick: handleInputClick,
            }}>
                {{
                  // Recursively pass down slots
                  ...slots,
                  default: (slotProps: any) =>
                        <input
                            {...slotProps}
                            value={ selectedValue.value }
                            readonly
                            ref={selectRef}
                        />,
                }}
            </ABaseInput>
            <Teleport to="body">
                <ul
                   onClick={closeOptions}
                    v-show={isOptionsVisible.value}
                    ref={refFloating}
                    class={['a-select-options-container absolute bg-[hsl(var(--a-layer))]', props.optionsWrapperClasses]}>
                    {
                      slots.default
                        ? slots.default?.({
                          attrs: {
                            class: optionClasses,
                          },
                        })
                        : props.options?.map(option => <li class={optionClasses} onClick={() => handleOptionClick(option)}>
                          {isObjectOption(option) ? (option as ObjectOption).label : option}
                        </li>)
                    }
                </ul>
            </Teleport>
        </>
  },
})

export type ASelect = InstanceType<typeof ASelect>
