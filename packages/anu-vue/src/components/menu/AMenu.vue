<script lang="ts" setup>
import type { Middleware, Placement, Strategy } from '@floating-ui/vue'
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside, useEventListener, useMounted } from '@vueuse/core'
import type { PropType, Ref } from 'vue'
import { getCurrentInstance, onMounted, ref } from 'vue'
import { sameWidth as sameWidthMiddleware } from './middlewares'
import { useTeleport } from '@/composables/useTeleport'
import { useInternalBooleanState } from '@/composables/useInternalBooleanState'
import { ACard } from '@/components'

const props = defineProps({
  /**
   * Show/Hide menu base on v-model value
   */
  modelValue: {
    type: Boolean,
    default: undefined,
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
    type: [String, null] as PropType<string | null>,
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
  middleware: Function as PropType<(referenceEl: Ref<HTMLElement>, floatingEl: Ref<HTMLElement>) => Middleware[]>,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineOptions({
  name: 'AMenu',
})

const { teleportTarget } = useTeleport()
const isMounted = useMounted()
const { internalState: isAlertVisible, toggle: toggleAlertVisibility } = useInternalBooleanState(toRef(props, 'modelValue'), emit, 'update:modelValue', false)

// Template refs
const refReference = ref()
const refFloating = ref()

/*
    ℹ️ We need to construct the internal middleware variable

    If user don't pass the middleware prop then prop value will be `undefined` which will easy to tackle with simple if condition as shown below

    Here, we will use user's middleware if passed via props or we will use our defaults
    */
const _middleware = props.middleware === undefined
  ? [
      // ℹ️ For this we need need bridge to handle keep menu content open
      // offset(6),

      sameWidthMiddleware(refFloating),
      flip(),
      shift({ padding: 10 }),
    ] as Middleware[]
  : props.middleware(refReference, refFloating)

// Calculate position of floating element
const { x, y, strategy } = useFloating(refReference, refFloating, {
  strategy: toRef(props, 'strategy'),
  placement: toRef(props, 'placement'),
  middleware: _middleware,
  whileElementsMounted: autoUpdate,
})

onMounted(() => {
  const vm = getCurrentInstance()
  if (vm?.proxy?.$parent)
    refReference.value = vm?.proxy?.$parent.$el
})

// 👉 Event listeners
/*
    If moduleValue is provided don't attach any event to modify the visibility of menu
    props.modelValue === undefined => modelValue isn't provided
*/
if (props.modelValue === undefined) {
  // If trigger is hover
  if (props.trigger === 'hover') {
    // Reference
    useEventListener(refReference, 'mouseenter', () => {
      if (isAlertVisible.value === false)
        toggleAlertVisibility()
    })
    useEventListener(refReference, 'mouseleave', () => {
      if (isAlertVisible.value === true)
        toggleAlertVisibility()
    })

    // Floating
    useEventListener(refFloating, 'mouseenter', () => {
      if (isAlertVisible.value === false)
        toggleAlertVisibility()
    })
    useEventListener(refFloating, 'mouseleave', () => {
      if (isAlertVisible.value === true)
        toggleAlertVisibility()
    })
  }
  else {
    useEventListener(refReference, 'click', toggleAlertVisibility)

    if (props.persist !== true) {
      onClickOutside(
        refReference,
        _event => {
          if (isAlertVisible.value)
            toggleAlertVisibility()
        },
        {
          ignore: props.persist === 'content' ? [refFloating] : [],
        },
      )
    }
  }
}
</script>

<template>
  <Teleport
    v-if="isMounted"
    :to="teleportTarget"
  >
    <!-- ℹ️ Transition component don't accept null as value of name prop so we need `props.transition || undefined` -->
    <Transition :name="props.transition || undefined">
      <div
        v-show="props.modelValue ?? isAlertVisible"
        ref="refFloating"
        class="a-menu"
        :style="{
          top: `${y ?? 0}px`,
          left: `${x ?? 0}px`,
        }"
        :class="strategy"
      >
        <ACard>
          <slot />
        </ACard>
      </div>
    </Transition>
  </Teleport>
</template>
