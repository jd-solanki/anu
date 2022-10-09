import { useTextareaAutosize } from '@vueuse/core'
import { defineComponent } from 'vue'
import { ABaseInput, useBaseInputProp } from '@/components/base-input'

export const ATextarea = defineComponent({
  name: 'ATextarea',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    height: String,
    ...useBaseInputProp(),
    autosize: {
      type: [Boolean, Number],
      default: false,
    },
  },
  setup(props, { slots, emit, attrs }) {
    const { textarea, input } = useTextareaAutosize({
      input: props.modelValue,
      onResize: () => {
        if (props.autosize && textarea.value.parentElement)
          textarea.value.parentElement.style.height = `${Math.min(textarea.value.scrollHeight, typeof props.autosize === 'number' ? props.autosize : Infinity)}px`

        emit('update:modelValue', input.value)
      },
    })

    return () => <ABaseInput disabled={props.disabled} readonly={props.readonly} {...attrs} inputWrapperClasses={['min-h-32 overflow-hidden', props.height]}>
            {{
              // Recursively pass down slots
              ...slots,
              default: (slotProps: any) =>
                    <textarea
                        {...slotProps}
                        ref={props.autosize ? textarea : null}
                        v-model={input.value}
                        class="a-textarea bg-transparent resize-none"
                        style={typeof props.autosize === 'number' && `max-height: ${props.autosize - 2}px`} // Pixel perfect : -2px for border
                    />,
            }}
        </ABaseInput>
  },
})

export type ATextarea = InstanceType<typeof ATextarea>
