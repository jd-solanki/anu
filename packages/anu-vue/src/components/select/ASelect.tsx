import { ABaseInput } from '@/components/base-input';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { onClickOutside } from '@vueuse/core';
import { defineComponent, onBeforeUnmount, onMounted, ref, Teleport, watch } from 'vue';

export const ASelect = defineComponent({
    name: 'ASelect',
    props: {
        modelValue: String,
    },
    setup(props, { slots, emit, attrs }) {
        // SECTION Floating
        // Template refs
        const refReference = ref()
        const refFloating = ref()

        const isOptionsVisible = ref(false)

        const calculateFloatingPosition = async () => {
            const { x, y } = await computePosition(refReference.value.$el, refFloating.value, {
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
            floatingUiCleanup = autoUpdate(refReference.value.$el, refFloating.value, calculateFloatingPosition)
        })
        onBeforeUnmount(() => floatingUiCleanup())

        onClickOutside(
            refFloating,
            event => {
                if (isOptionsVisible.value) isOptionsVisible.value = false
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
        const isEleInteractive = Object.prototype.hasOwnProperty.call(attrs, 'disabled') || Object.prototype.hasOwnProperty.call(attrs, 'readonly')
        const openOptions = (e: Event) => {
            console.log('object', e);
            if (!isEleInteractive) isOptionsVisible.value = !isOptionsVisible.value
        }

        return () => <>
            {/* TODO: Make sure we don't bind input's `type` attr here */}
            <ABaseInput {...attrs} appendInnerIcon="i-bx-chevron-down" ref={refReference} inputContainerAttrs={{
                onClick: openOptions,
            }}>
                {{
                    // Recursively pass down slots
                    ...slots,
                    default: (slotProps: any) =>
                        <input
                            {...slotProps}
                            value={props.modelValue}
                            onInput={(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)}
                            readonly
                            placeholder="Please select"
                        />
                }}
            </ABaseInput>
            <Teleport to="body">
                <ul
                    v-show={isOptionsVisible.value}
                    ref={refFloating}
                    class="z-10 g-select-options absolute bg-white border border-solid border-gray-200 m-0 rounded-lg py-3 shadow-lg">
                    {slots.default?.({
                        attrs: {
                            class: 'px-4 py-1 hover:bg-gray-100 cursor-pointer text-ellipsis overflow-hidden',
                        }
                    })}
                </ul>
            </Teleport>
        </>
    },
})

export type ASelect = InstanceType<typeof ASelect>
