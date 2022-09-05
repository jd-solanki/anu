import { ACard, useCardProps } from '@/components/card'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { onClickOutside } from '@vueuse/core'
import { defineComponent, ref, Teleport, toRef, Transition } from 'vue'

export const ADialog = defineComponent({
  name: 'ADialog',
  props: {
    ...useCardProps(),
    modelValue: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, emit, attrs }) {
    const refCard = ref()
    if (!props.persistent) {
      onClickOutside(refCard, () => {
        // If dialog is not open => Don't execute
        if (!props.modelValue)
          return

        emit('update:modelValue', false)
      })
    }

    // Lock DOM scroll when modelValue is `true`
    useDOMScrollLock(toRef(props, 'modelValue'))

    return () => <Teleport to="body">
      <Transition name="bg">
        <div v-show={props.modelValue} class={['a-dialog-wrapper grid uno-layer-base-place-items-center fixed uno-layer-base-inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))]']}>
          <Transition name="scale">
            <ACard {...attrs} v-show={props.modelValue} class="a-dialog backface-hidden transform translate-z-0 max-w-[calc(100vw-2rem)]" ref={refCard} {...props}>{{ ...slots }}</ACard>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  },
})

export type ADialog = InstanceType<typeof ADialog>
