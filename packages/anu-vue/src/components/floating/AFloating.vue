<script lang="ts" setup>
import { useTeleport } from '@/composables/useTeleport'
import type { Middleware } from '@floating-ui/vue'
import { autoUpdate, flip, shift, useFloating } from '@floating-ui/vue'
import { onClickOutside, useEventListener, useMounted } from '@vueuse/core'
import { ref } from 'vue'
import type { FloatingEvents } from './events'
import { sameWidth as sameWidthMiddleware } from './middlewares'
import { floatingProps } from './props'

const props = defineProps(floatingProps)

const emit = defineEmits<FloatingEvents>()

defineOptions({
  name: 'AFloating',
  inheritAttrs: false,
})

const { teleportTarget } = useTeleport()
const isMounted = useMounted()

// ℹ️ If floating element is already visible then use `hideDelay` otherwise use `showDelay` for debounce
const _delay = ref(props.modelValue ? props.hideDelay : props.delay)

const isFloatingElVisible = useVModel(props, 'modelValue', emit, { defaultValue: false, passive: true })
watch(isFloatingElVisible, isShown => {
  // Set hide delay when element is visible and show delay when element is hidden
  _delay.value = isShown ? props.hideDelay : props.delay

  // Trigger events on visibility change
  isShown
    ? emit('show')
    : emit('hide')
})
const isFloatingElVisibleDebounced = refDebounced(isFloatingElVisible, _delay)

// Template refs
// const props.referenceEl = ref()
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
  : props.middleware(props.referenceEl, refFloating)

// Calculate position of floating element
const { x, y, strategy } = useFloating(toRef(props, 'referenceEl'), refFloating, {
  strategy: toRef(props, 'strategy'),
  placement: toRef(props, 'placement'),
  middleware: _middleware,
  whileElementsMounted: autoUpdate,
})

// onMounted(() => {
//   const vm = getCurrentInstance()
//   console.log('vm?.proxy?.$el :>> ', vm?.proxy?.$parent)
//   console.log('vm?.proxy?.$parent.$el :>> ', vm?.proxy?.$parent.$el)
//   if (vm?.proxy?.$parent)
//     props.referenceEl.value = vm?.proxy?.$parent.$el
// })

// 👉 Event listeners
/*
    If moduleValue is provided don't attach any event to modify the visibility of menu
    props.modelValue === undefined => modelValue isn't provided
*/
if (props.modelValue === undefined) {
  // If trigger is hover
  if (props.trigger === 'hover') {
    // TODO: Try to refactor multiple listeners via https://github.com/vueuse/vueuse/pull/2180
    // Reference
    useEventListener(toRef(props, 'referenceEl'), 'mouseenter', () => {
      isFloatingElVisible.value = true
    })
    useEventListener(toRef(props, 'referenceEl'), 'mouseleave', () => {
      isFloatingElVisible.value = false
    })

    // Floating
    useEventListener(refFloating, 'mouseenter', () => {
      isFloatingElVisible.value = true
    })
    useEventListener(refFloating, 'mouseleave', () => {
      isFloatingElVisible.value = false
    })
  }
  else {
    useEventListener(
      toRef(props, 'referenceEl'),
      'click',
      () => { isFloatingElVisible.value = !isFloatingElVisible.value },
    )

    if (props.persist !== true) {
      onClickOutside(
        toRef(props, 'referenceEl'),
        _event => {
          isFloatingElVisible.value = false
        },
        {
          ignore: props.persist === 'content' ? [refFloating] : [],
        },
      )
    }
  }
}

// Expose: https://vuejs.org/api/sfc-script-setup.html#defineexpose
defineExpose({
  refFloating,
})
</script>

<template>
  <Teleport
    v-if="isMounted"
    :to="teleportTarget"
  >
    <!-- ℹ️ Transition component don't accept null as value of name prop so we need `props.transition || undefined` -->
    <Transition :name="props.transition as any || undefined">
      <div
        v-show="isFloatingElVisibleDebounced"
        v-bind="$attrs"
        ref="refFloating"
        class="a-floating transform"
        :style="{
          top: `${y ?? 0}px`,
          left: `${x ?? 0}px`,
        }"
        :class="strategy"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
