<script lang="ts" setup>
import { baseInputProps } from './props'
import { useSpacing } from '@/composables/useSpacing'
import TransitionExpand from '@/transitions/TransitionExpand.vue'

// TODO: Provide a way to attach classes to root element
const props = defineProps(baseInputProps)

const emit = defineEmits<{
  (e: 'click:inputWrapper'): void
}>()

defineOptions({
  name: 'ABaseInput',
})

const attrs = useAttrs()

const spacing = useSpacing(toRef(props, 'spacing'))
const iconTransition = 'transition duration-150 ease -in'
const elementId = attrs.id || props.label ? `a-input-${attrs.id || props.label}-${Math.random().toString(36).slice(2, 7)}` : undefined

const refRoot = ref()
const refInputContainer = ref()

defineExpose({
  refRoot,
  refInputContainer,
})
</script>

<template>
  <div
    ref="refRoot"
    class="a-base-input-root i:children:focus-within:text-primary flex flex-col flex-grow flex-shrink-0"
    :class="[
      props.disabled && 'a-base-input-disabled',
      (props.disabled || props.readonly) && 'pointer-events-none',
      !(props.disabled || props.readonly) && 'a-base-input-interactive',
    ]"
    :style="{ '--a-spacing': spacing / 100 }"
  >
    <!-- 👉 Label -->
    <slot name="label">
      <label
        v-if="props.label"
        :for="elementId"
        class="a-base-input-label"
        :class="[props.error && 'text-danger']"
      >
        {{ props.label }}
      </label>
    </slot>

    <!-- SECTION Input Container -->
    <div
      ref="refInputContainer"
      class="a-base-input-input-container flex items-center"
      v-bind="props.inputContainerAttrs"
    >
      <!-- 👉 Slot: Prepend -->
      <slot name="prepend">
        <i
          v-if="props.prependIcon"
          :class="[iconTransition, props.prependIcon]"
        />
      </slot>

      <!-- SECTION Input Wrapper -->
      <div
        :class="[props.inputWrapperClasses, props.error ? 'border-danger' : 'focus-within:border-primary']"
        class="a-base-input-input-wrapper cursor-text em:spacing:px-4 spacing:gap-x-2 relative i:focus-within:text-primary items-center border border-solid border-a-border w-full"
        @click="$emit('click:inputWrapper')"
      >
        <!-- 👉 Slot: Prepend Inner -->
        <slot name="prepend-inner">
          <i
            v-if="props.prependInnerIcon"
            class="a-base-input-prepend-inner-icon"
            :class="[iconTransition, props.prependInnerIcon]"
          />
        </slot>

        <!-- 👉 Slot: Default -->
        <!-- TODO: We need to improve default slot implementation so that we can provide selected slot to selection component -->
        <slot
          :id="elementId"
          :readonly="props.readonly"
          :disabled="props.disabled"
          class="a-base-input-child w-full h-full inset-0 rounded-inherit bg-transparent"
          :class="[
            props.inputClasses,
            $slots['prepend-inner'] || props.prependInnerIcon
              ? 'a-base-input-w-prepend-inner'
              : 'a-base-input-wo-prepend-inner',
            $slots['append-inner'] || props.appendInnerIcon
              ? 'a-base-input-w-append-inner'
              : 'a-base-input-wo-append-inner',
          ]"
        />

        <!-- 👉 Slot: Append Inner -->
        <slot name="append-inner">
          <i
            v-if="props.appendInnerIcon"
            class="a-base-input-append-inner-icon ms-auto"
            :class="[iconTransition, props.appendInnerIcon]"
          />
        </slot>
      </div>
      <!-- !SECTION -->

      <!-- 👉 Slot: Append -->
      <slot name="append">
        <i
          v-if="props.appendIcon"
          :class="[iconTransition, props.appendIcon]"
        />
      </slot>
    </div>
    <!-- !SECTION -->

    <!-- 👉 Slot: Bottom -->
    <slot name="bottom">
      <TransitionExpand>
        <div
          v-show="props.error || props.hint"
          class="h-8"
        >
          <small
            class="inline-block"
            :class="[props.error ? 'text-danger' : 'text-light-emphasis']"
          >
            {{ props.error || props.hint }}</small>
        </div>
      </TransitionExpand>
    </slot>
  </div>
</template>