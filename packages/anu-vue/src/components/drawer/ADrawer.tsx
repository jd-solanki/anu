import { onClickOutside } from '@vueuse/core'
import type { PropType } from 'vue'
import { Teleport, Transition, defineComponent, ref, toRef } from 'vue'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { ACard, useCardProps } from '@/components/card'

export const ADrawer = defineComponent({
  name: 'ADrawer',
  props: {
    ...useCardProps(),

    /**
     * Show/Hide drawer base on v-model value
     */
    modelValue: {
      type: Boolean,
      default: false,
    },

    /**
     * Persistence of drawer when clicked outside of reference element
     */
    persistent: {
      type: Boolean,
      default: false,
    },

    /**
     * Drawer anchor/position
     */
    anchor: {
      type: String as PropType<'left' | 'right'>,
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
          'a-drawer-wrapper grid fixed uno-layer-base-inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))]',
          props.anchor === 'right' ? 'justify-end' : 'justify-start',
        ]}>
          <Transition name={`slide-${props.anchor}`}>
            <ACard {...attrs} v-show={props.modelValue} class="a-drawer backface-hidden transform translate-z-0" ref={refCard} {...props}>{{ ...slots }}</ACard>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  },
})

export type ADrawer = InstanceType<typeof ADrawer>
