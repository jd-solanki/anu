<script lang="ts" setup>
import type { Ref } from 'vue'
import type { ADialogEvents } from './meta'
import { aDialogProps, aDialogSlots } from './meta'
import { ACard } from '@/components/card'
import { useDOMScrollLock } from '@/composables/useDOMScrollLock'
import { useDefaults } from '@/composables/useDefaults'
import { useTeleport } from '@/composables/useTeleport'
import { onClickSameTarget } from '@/composables/onClickSameTarget'
import { filterUsedSlots } from '@/utils/vue'

// SECTION Meta
const _props = defineProps(aDialogProps)
const emit = defineEmits<ADialogEvents>()
defineSlots<typeof aDialogSlots>()

defineOptions({
  name: 'ADialog',
  inheritAttrs: false,
})
const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const { teleportTarget } = useTeleport()
const isMounted = useMounted()

const refMask = ref<HTMLDivElement>()
onClickSameTarget(refMask, () => {
  // If dialog is open & persistent prop is false => Close dialog
  if (props.modelValue && !props.persistent)
    emit('update:modelValue', false)
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
        ref="refMask"
        class="a-dialog-wrapper grid place-items-center fixed inset-0 bg-[hsla(var(--a-backdrop-c),var(--a-backdrop-opacity))]"
      >
        <Transition name="dialog">
          <ACard
            v-show="props.modelValue"
            class="a-dialog backface-hidden transform translate-z-0 max-w-[calc(100vw-2rem)]"
            :class="defaultsClass"
            :style="defaultsStyle"
            v-bind="{ ...$attrs, ...props, ...defaultsAttrs }"
          >
            <!-- ℹ️ Recursively pass down slots to child -->
            <template
              v-for="name in filterUsedSlots(aDialogSlots)"
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
