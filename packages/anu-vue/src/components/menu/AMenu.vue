<script lang="ts" setup>
import type { Middleware, Placement, Strategy } from '@floating-ui/dom'
import { autoUpdate, computePosition, flip, shift } from '@floating-ui/dom'
import { onClickOutside, useEventListener, useMounted } from '@vueuse/core'
import { Teleport, Transition, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { sameWidth as sameWidthMiddleware } from './middlewares'
import { useTeleport } from '@/composables/useTeleport'
import { useInternalBooleanState } from '@/composables/useInternalState'
import { ACard } from '@/components'

interface Props {
  modelValue?: boolean
  persist?: boolean | 'content'
  trigger?: 'click' | 'hover'
  transition?: string | null
  placement?: Placement
  strategy?: Strategy
  middleware?: ((referenceEl: HTMLElement, floatingEl: HTMLElement) => Middleware[]) | null
}
const props = withDefaults(defineProps<Props>(), {
  // ℹ️ We need to set default value as undefined for `useInternalBooleanState` to work properly
  modelValue: undefined,
  transition: 'slide-up',
  placement: 'bottom-start',
  strategy: 'absolute',
  middleware: null,
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
})

// Recalculate position if placement changes at runtime
watch(
  [isMounted, () => props.placement],
  () => {
    nextTick(() => {
      floatingUiCleanup = autoUpdate(refReference.value, refFloating.value.$el, calculateFloatingPosition)
    })
  },
)
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
      <ACard
        v-show="props.modelValue ?? isAlertVisible"
        ref="refFloating"
        class="a-menu"
        :class="[props.strategy === 'fixed' ? 'fixed' : 'absolute']"
      >
        <slot />
      </ACard>
    </Transition>
  </Teleport>
</template>

<style lang="scss">

</style>
