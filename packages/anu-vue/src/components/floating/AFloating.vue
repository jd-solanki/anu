<script lang="ts" setup>
import { autoUpdate, useFloating } from '@floating-ui/vue'
import { onClickOutside, useEventListener, useMounted } from '@vueuse/core'
import type { CSSProperties } from 'vue'
import { ref } from 'vue'
import type { AFloatingEvents, aFloatingSlots } from './meta'
import { aFloatingProps } from './meta'
import { useZIndex } from '@/composables/useZIndex'
import { useTeleport } from '@/composables/useTeleport'

const props = defineProps(aFloatingProps)
const emit = defineEmits<AFloatingEvents>()
defineSlots<typeof aFloatingSlots>()

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

const _middleware = computed(() => props.middleware(toRef(props, 'referenceEl'), refFloating))

// Calculate position of floating element
const { x, y, strategy } = useFloating(toRef(props, 'referenceEl'), refFloating, {
  strategy: toRef(props, 'strategy'),
  placement: toRef(props, 'placement'),
  middleware: _middleware,
  whileElementsMounted: autoUpdate,
})

const { getNextZIndex } = useZIndex()
const zIndex = getNextZIndex()

const contentStyle = computed<CSSProperties>(() => {
  return {
    top: `${unref(y) ?? 0}px`,
    left: `${unref(x) ?? 0}px`,
    zIndex,
  }
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
        () => {
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
    <Transition :name="props.transition || undefined">
      <div
        v-show="isFloatingElVisibleDebounced"
        v-bind="$attrs"
        ref="refFloating"
        class="a-floating transform"
        :style="contentStyle"
        :class="strategy"
      >
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
