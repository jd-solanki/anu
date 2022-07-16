import { ACard, useCardProps } from '@/components/card'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { onClickOutside } from '@vueuse/core'
import { defineComponent, ref, Teleport, toRef } from 'vue'

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
      <div {...attrs} class={[{ hidden: !props.modelValue }, 'a-dialog-wrapper grid uno-layer-base-place-items-center mx-auto fixed uno-layer-base-inset-0 after:(content-empty fixed inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))] z-[51] backdrop-blur-[4px])']}>
        <ACard class="a-dialog max-w-[calc(100vw-2rem)]" ref={refCard} {...props}>{{ ...slots }}</ACard>
      </div>
    </Teleport>
  },
})

export type ADialog = InstanceType<typeof ADialog>
