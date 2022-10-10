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
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'left',
    },
  },
  emits: ['update:modelValue'],
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
        <div v-show={props.modelValue} class={[
          'a-drawer-wrapper flex fixed uno-layer-base-inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))]',
          ['left', 'right'].includes(props.anchor) ? 'flex-row' : 'flex-col',
          ['right', 'bottom'].includes(props.anchor) ? 'justify-end' : 'justify-start',
        ]}>
          <Transition name={`slide-${props.anchor === 'bottom' ? 'up' : props.anchor === 'top' ? 'down' : props.anchor}`}>
            <ACard {...attrs} v-show={props.modelValue} class={[
              'a-drawer backface-hidden transform translate-z-0',
              props.anchor === 'bottom' ? '[--a-transition-slide-up-transform:100%]' : '',
              ['left', 'right'].includes(props.anchor) ? 'uno-layer-base-w-[300px] max-w-[calc(100vw-2rem)]' : 'uno-layer-base-h-[300px] max-h-[calc(100vh-2rem)]']}
              ref={refCard} {...props}>{{ ...slots }}</ACard>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  },
})

export type ADrawer = InstanceType<typeof ADrawer>
