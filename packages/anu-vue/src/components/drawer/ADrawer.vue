<script lang="ts" setup>
import type { Ref } from 'vue'
import type { CardProps } from '@/components/card'
import { ACard, cardPropsDefaults } from '@/components/card'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { useTeleport } from '@/composables/useTeleport'

interface Props extends CardProps {
  modelValue?: boolean
  persistent?: boolean
  anchor?: 'left' | 'right' | 'top' | 'bottom'
}

// TODO: Fix type
const props = withDefaults(defineProps<Props>(), {
  ...cardPropsDefaults,
  anchor: 'left',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineOptions({
  name: 'ADrawer',
  inheritAttrs: false,
})

const { teleportTarget } = useTeleport()
const isMounted = useMounted()

const refCard = ref()
if (!props.persistent) {
  onClickOutside(refCard, () => {
    // If dialog is not open => Don't execute
    if (!props.modelValue)
      return

    emit('update:modelValue', false)
  })
}

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
        class="a-drawer-wrapper flex fixed uno-layer-base-inset-0 bg-[hsla(var(--a-overlay-color),var(--a-overlay-opacity))]"
        :class="[
          `a-drawer-anchor-${props.anchor}`,
          // `flex-col` set full width for top & bottom anchored drawer
          ['top', 'bottom'].includes(props.anchor) && 'flex-col',

          // set drawer to end of flex container of anchor is right or bottom
          ['right', 'bottom'].includes(props.anchor) && 'justify-end',
        ]"
      >
        <Transition :name="`slide-${props.anchor === 'bottom' ? 'up' : props.anchor === 'top' ? 'down' : props.anchor}`">
          <ACard
            v-show="props.modelValue"
            ref="refCard"
            class="a-drawer backface-hidden transform translate-z-0"
            :class="[props.anchor === 'bottom' && '[--a-transition-slide-up-transform:100%]']"
            v-bind="{ ...$attrs, ...props }"
          >
            <!-- ℹ️ Recursively pass down slots to child -->
            <template
              v-for="(_, name) in $slots"
              #[name]="slotProps"
            >
              <slot
                :name="name"
                v-bind="slotProps || {}"
              />
            </template>
          </ACard>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
