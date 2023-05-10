<script lang="ts" setup>
import type { Ref } from 'vue'
import type { ADrawerEvents } from './meta'
import { aDrawerProps, aDrawerSlots } from './meta'
import { ACard } from '@/components/card'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { useTeleport } from '@/composables/useTeleport'

const props = defineProps(aDrawerProps)
const emit = defineEmits<ADrawerEvents>()
defineSlots<typeof aDrawerSlots>()

defineOptions({
  name: 'ADrawer',
  inheritAttrs: false,
})

const { teleportTarget } = useTeleport()
const isMounted = useMounted()

const refCard = ref()
onClickOutside(refCard, () => {
  // If dialog is open & persistent prop is false => Close drawer
  if (props.modelValue && !props.persistent)
    emit('update:modelValue', false)
})

const transitionName = computed(() => {
  if (props.anchor === 'bottom')
    return 'slide-y'
  else if (props.anchor === 'top')
    return 'slide-y-reverse'
  else if (props.anchor === 'right')
    return 'slide-x-reverse'

  return 'slide-x'
})

const transitionClasses = computed(() => {
  if (props.anchor === 'bottom')
    return '[--slide-y-translateY:100%]'
  else if (props.anchor === 'top')
    return '[--slide-y-reverse-translateY:-100%]'
  else if (props.anchor === 'right')
    return '[--slide-x-reverse-translateX:100%]'

  return '[--slide-x-translateX:-100%]'
})

// Lock DOM scroll when modelValue is `true`
// ℹ️ We need to use type assertion here because of this issue: https://github.com/johnsoncodehk/volar/issues/2219
useDOMScrollLock(toRef(props, 'modelValue') as Ref<boolean>)
</script>

<template>
  <Teleport
    v-if="isMounted"
    :to="teleportTarget"
  >
    <Transition name="bg">
      <div
        v-show="props.modelValue"
        class="a-drawer-wrapper flex fixed inset-0 bg-[hsla(var(--a-backdrop-c),var(--a-backdrop-opacity))]"
        :class="[
          `a-drawer-anchor-${props.anchor}`,
          // `flex-col` set full width for top & bottom anchored drawer
          ['top', 'bottom'].includes(props.anchor) && 'flex-col',

          // set drawer to end of flex container of anchor is right or bottom
          ['right', 'bottom'].includes(props.anchor) && 'justify-end',
        ]"
      >
        <Transition
          :duration="30000"
          :name="transitionName"
        >
          <ACard
            v-show="props.modelValue"
            ref="refCard"
            :style="[`--${transitionName}-opacity: 1`, `--${transitionName}--transform-timing: ease-in-out`]"
            class="a-drawer backface-hidden transform translate-z-0"
            :class="transitionClasses"
            v-bind="{ ...$attrs, ...props }"
          >
            <!-- ℹ️ Recursively pass down slots to child -->
            <template
              v-for="(_, name) in aDrawerSlots"
              #[name]="slotProps"
            >
              <slot
                :name="name"
                v-bind="slotProps"
              />
            </template>
          </ACard>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
