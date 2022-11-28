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

    return () => <Teleport to="#a-teleport-target">
      <Transition name="bg">
        <div
          class={[
            'a-drawer-wrapper flex fixed uno-layer-base-inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))]',
            `a-drawer-anchor-${props.anchor}`,

            // `flex-col` set full width for top & bottom anchored drawer
            ['top', 'bottom'].includes(props.anchor) && 'flex-col',

            // set drawer to end of flex container of anchor is right or bottom
            ['right', 'bottom'].includes(props.anchor) && 'justify-end',
          ]}
          v-show={props.modelValue}
        >
          <Transition name={`slide-${props.anchor === 'bottom' ? 'up' : props.anchor === 'top' ? 'down' : props.anchor}`}>
            <ACard
              {...attrs}
              {...props}
              class={[
                'a-drawer backface-hidden transform translate-z-0',
                props.anchor === 'bottom' && '[--a-transition-slide-up-transform:100%]',
              ]}
              ref={refCard}
              v-show={props.modelValue}
            >
              {{ ...slots }}
            </ACard>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  },
})

export type ADrawer = InstanceType<typeof ADrawer>
