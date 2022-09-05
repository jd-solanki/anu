import { onClickOutside } from '@vueuse/core'
import type { PropType } from 'vue'
import { Teleport, Transition, defineComponent, ref, toRef } from 'vue'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { ACard, useCardProps } from '@/components/card'

export const ADrawer = defineComponent({
  name: 'ADrawer',
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
    anchor: {
      type: String as PropType<'left' | 'right'>,
      default: 'left',
    },
  },
  setup(props, { slots, emit, attrs }) {
    const refCard = ref()
    if (!props.persistent) {
      onClickOutside(refCard, () => {
        // If drawer is not open => Don't execute
        if (!props.modelValue)
          return

        emit('update:modelValue', false)
      })
    }

    // Lock DOM scroll when modelValue is `true`
    useDOMScrollLock(toRef(props, 'modelValue'))

    return () => <Teleport to="body">
      <Transition name="bg">
        <div {...attrs} v-show={props.modelValue} class={[`a-drawer-wrapper a-drawer-wrapper-anchor-${props.anchor} grid fixed uno-layer-base-inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))]`]}>
          <Transition name={`slide-${props.anchor}`}>
            <ACard v-show={props.modelValue} class={['a-drawer backface-hidden transform translate-z-0 rounded-none max-w-[calc(100vw-2rem)]', '']} ref={refCard} {...props}>{{ ...slots }}</ACard>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  },
})

export type ADrawer = InstanceType<typeof ADrawer>
