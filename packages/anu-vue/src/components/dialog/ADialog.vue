<script lang="ts" setup>
import type { Ref } from 'vue'
import { ACard, cardProps } from '@/components/card'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { defuProps } from '@/composables/useProps'
import { useTeleport } from '@/composables/useTeleport'

const props = defineProps(defuProps({
  /**
   * Show/Hide menu base on v-model value
   */
  modelValue: Boolean,

  /**
   * Persistence of dialog when clicked outside of reference element
   */
  persistent: Boolean,
}, cardProps))

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineOptions({
  name: 'ADialog',
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
        class="a-dialog-wrapper grid place-items-center fixed inset-0 bg-[hsla(var(--a-backdrop-c),var(--a-backdrop-opacity))]"
      >
        <Transition name="dialog">
          <ACard
            v-show="props.modelValue"
            ref="refCard"
            class="a-dialog backface-hidden transform translate-z-0 max-w-[calc(100vw-2rem)]"
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
