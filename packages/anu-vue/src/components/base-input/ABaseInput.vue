<script lang="ts" setup>
import type { ABaseInputEvents, aBaseInputSlots } from './meta'
import { aBaseInputProps } from './meta'
import { ALoader } from '@/components/loader'
import { useConfigurable } from '@/composables/useConfigurable'
import { useDefaults } from '@/composables/useDefaults'
import TransitionExpand from '@/transitions/TransitionExpand.vue'

// SECTION Meta

// TODO: Provide a way to attach classes to root element
const _props = defineProps(aBaseInputProps)

defineEmits<ABaseInputEvents>()

defineSlots<typeof aBaseInputSlots>()

defineOptions({
  name: 'ABaseInput',
})

const { props, defaultsClass, defaultsStyle, defaultsAttrs } = useDefaults(_props)

// !SECTION

const attrs = useAttrs()

const configurableLabel = useConfigurable(toRef(props, 'label'))

const iconTransition = 'transition duration-150 ease-in'

const _elementIdToken = attrs.id || props.label
const elementId = _elementIdToken ? `a-input-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}` : undefined

const refRoot = ref()
const refInputContainer = ref()
const refInputWrapper = ref()

defineExpose({
  refRoot,
  refInputContainer,
  refInputWrapper,
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
      defaultsClass,
    ]"
    :style="defaultsStyle"
    v-bind="defaultsAttrs"
  >
    <!-- 👉 Label -->
    <slot name="label">
      <label
        v-if="props.label"
        :for="elementId"
        class="a-base-input-label"
        v-bind="configurableLabel.attrs"
        :class="[props.error && 'text-danger', configurableLabel.classes]"
      >
        {{ configurableLabel.content }}
      </label>
    </slot>

    <!-- SECTION Input Container -->
    <div
      ref="refInputContainer"
      class="a-base-input-input-container flex items-center"
    >
      <!-- 👉 Slot: Prepend -->
      <slot name="prepend">
        <i
          v-if="props.prependIcon"
          :class="[iconTransition, props.prependIcon]"
        />
      </slot>

      <!-- SECTION Input Wrapper -->
      <!-- ❗ relative class is required for loader on `.a-base-input-input-wrapper` -->
      <div
        ref="refInputWrapper"
        v-bind="props.inputWrapperAttrs"
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
          :class="[
            // eslint-disable-next-line vue/prefer-separate-static-class
            'a-base-input-child w-full h-full inset-0 rounded-inherit bg-transparent',
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
          <ALoader v-if="props.loading" />
          <i
            v-else-if="props.appendInnerIcon"
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
