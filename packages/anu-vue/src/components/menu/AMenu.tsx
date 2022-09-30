import type { Middleware, Placement, Strategy } from '@floating-ui/dom'
import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom'
import { onClickOutside, useEventListener } from '@vueuse/core'
import type { PropType } from 'vue'
import { Teleport, Transition, defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { sameWidth as sameWidthMiddleware } from './middlewares'
import { ACard } from '@/components'

export const AMenu = defineComponent({
  name: 'AMenu',
  props: {
    /**
     * Show/Hide menu base on v-model value
     */
    modelValue: {
      type: Boolean,
      default: null,
    },

    /**
     * Persistence of menu when clicked outside of reference element
     */
    persist: {
      type: [Boolean, String] as PropType<boolean | 'content'>,
      default: false,
    },

    /**
     * Trigger event to open the menu
     */
    trigger: {
      type: String as PropType<'click' | 'hover'>,
      default: 'click',
    },

    /**
     * Transition to add while showing/hiding menu
     */
    transition: {
      type: String as PropType<string | null>,
      default: 'slide-up',
    },

    // -- Floating UI based Props

    // https://floating-ui.com/docs/computePosition#placement
    /**
     * Placement option from Floating UI
     */
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom-start',
    },

    // https://floating-ui.com/docs/computePosition#strategy
    /**
     * Strategy option from Floating UI
     */
    strategy: {
      type: String as PropType<Strategy>,
      default: 'absolute',
    },

    // https://floating-ui.com/docs/tutorial#middleware
    /**
     * Middleware option from Floating UI
     */
    middleware: {
      type: [Function, Object] as PropType<((referenceEl: HTMLElement, floatingEl: HTMLElement) => Middleware[]) | null>,
      default: null,
    },
  },
  setup(props, { slots }) {
    const isMenuVisible = ref(props.modelValue ?? false)

    // Template refs
    const refReference = ref()
    const refFloating = ref()

    const calculateFloatingPosition = async () => {
      /*
        ℹ️ We need to construct the internal middleware variable

        If user don't pass the middleware prop then prop value will be `null` which will easy to tackle with simple if condition as shown below

        Here, we will use user's middleware if passed via props or we will use our defaults
      */
      const _middleware = props.middleware === null
        ? [
            // ℹ️ For this we need need bridge to handle keep menu content open
            // offset(6),

            sameWidthMiddleware(refFloating.value.$el),
            flip(),
            shift({ padding: 10 }),
          ] as Middleware[]
        : props.middleware(refReference.value, refFloating.value.$el)

      // Calculate position of floating element
      const { x, y } = await computePosition(refReference.value, refFloating.value.$el, {
        strategy: props.strategy,
        placement: props.placement,
        middleware: _middleware,
      })

      Object.assign(refFloating.value.$el.style, {
        left: `${x}px`,
        top: `${y}px`,
      })
    }

    let floatingUiCleanup: Function
    onMounted(() => {
      const vm = getCurrentInstance()
      refReference.value = vm?.proxy?.$el?.parentNode

      // Recalculate position if placement changes at runtime
      watch(() => props.placement, () => {
        floatingUiCleanup = autoUpdate(refReference.value, refFloating.value.$el, calculateFloatingPosition)
      }, { immediate: true })
    })
    onBeforeUnmount(() => floatingUiCleanup())

    // 👉 Event listeners
    /*
      If moduleValue is provided don't attach any event to modify the visibility of menu
      props.modelValue === null => modelValue isn't provided
    */
    if (props.modelValue === null) {
      // If trigger is hover
      if (props.trigger === 'hover') {
        // Reference
        useEventListener(refReference, 'mouseenter', () => { isMenuVisible.value = true })
        useEventListener(refReference, 'mouseleave', () => { isMenuVisible.value = false })

        // Floating
        useEventListener(refFloating, 'mouseenter', () => { isMenuVisible.value = true })
        useEventListener(refFloating, 'mouseleave', () => { isMenuVisible.value = false })
      }
      else {
        useEventListener(refReference, 'click', () => { isMenuVisible.value = !isMenuVisible.value })

        if (props.persist !== true) {
          onClickOutside(
            refReference,
            _event => {
              if (isMenuVisible.value)
                isMenuVisible.value = false
            },
            {
              ignore: props.persist === 'content' ? [refFloating] : [],
            },
          )
        }
      }
    }

    return () => <Teleport to="body">
      {/* ℹ️ Transition component don't accept null as value of name prop so we need `props.transition || undefined` */}
      <Transition name={props.transition || undefined}>
        <ACard
          class={['a-menu', props.strategy === 'fixed' ? 'fixed' : 'absolute']}
          v-show={props.modelValue ?? isMenuVisible.value}
          ref={refFloating}
        >
          {slots.default?.()}
        </ACard>
        </Transition>
    </Teleport>
  },
})

export type AMenu = InstanceType<typeof AMenu>
