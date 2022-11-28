import { onClickOutside } from '@vueuse/core'
import { Teleport, Transition, defineComponent, ref, toRef } from 'vue'
import { ACard, useCardProps } from '@/components/card'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { useTeleport } from '@/composables/useTeleport'

export const ADialog = defineComponent({
  name: 'ADialog',
  inheritAttrs: false,
  props: {
    ...useCardProps(),

    /**
     * Show/Hide menu base on v-model value
     */
    modelValue: {
      type: Boolean,
      default: false,
    },

    /**
     * Persistence of dialog when clicked outside of reference element
     */
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { slots, emit, attrs }) {
    const { teleportTarget } = useTeleport('#a-teleport-target')

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

    return () => <Teleport to={teleportTarget.value}>
      <Transition name="bg">
        <div
          class={['a-dialog-wrapper grid uno-layer-base-place-items-center fixed uno-layer-base-inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))]']}
          v-show={props.modelValue}
        >
          <Transition name="scale">
            <ACard
              {...attrs}
              class="a-dialog backface-hidden transform translate-z-0 max-w-[calc(100vw-2rem)]"
              ref={refCard}
              v-show={props.modelValue}
              {...props}
            >
              {{ ...slots }}
            </ACard>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  },
})

export type ADialog = InstanceType<typeof ADialog>
