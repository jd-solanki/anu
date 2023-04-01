<script lang="ts" setup>
import { ref } from 'vue'

const showCode = ref(false)
</script>

<template>
  <div class="vp-demo rounded-lg shadow bg-[hsl(var(--a-surface-c))]">
    <div
      v-if="$slots.title || $slots.code"
      class="vp-demo-header flex flex-wrap items-center justify-between"
    >
      <slot name="title" />
      <div
        v-if="$slots.code"
        class="flex items-center justify-end text-gray-300 dark:text-gray-600"
        :class="{ '!text-primary': showCode }"
      >
        <div
          class="i-bx-code cursor-pointer"
          @click="showCode = !showCode"
        />
      </div>
    </div>
    <div class="vp-demo-body">
      <slot />
      <div
        v-if="$slots.demo"
        class="vp-raw"
      >
        <slot name="demo" />
      </div>
      <div
        v-if="$slots['after-demo']"
        class="vp-after-demo mt-8"
      >
        <slot name="after-demo" />
      </div>
      <div
        v-if="$slots.code"
        v-show="showCode"
        class="vp-demo-code-container mt-4"
      >
        <slot name="code" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --vp-demo-card-padding: 1.5rem;

  @media (max-width: 768px) {
    --vp-demo-card-padding: 1.25rem;
  }
}

:root {
  --vp-demo-mt: 2rem;
}

.vp-demo {
  padding: var(--vp-demo-card-padding);
  margin-top: var(--vp-demo-mt);

  & + & {
    --vp-demo-mt: 3rem;
  }

  h2 {
    margin: 0;
    padding: 0;
    border-top: 0;
  }

  // Remove bg & shadow if bordered demo. Add border for separation
  &.vp-demo-bordered {
    background: transparent !important;
    box-shadow: none !important;
    border: 1px solid hsla(var(--a-base-c), var(--a-border-opacity)) !important;
  }
}

.vp-after-demo {
  .custom-block:last-child {
    margin-bottom: 0;
  }
}

.vp-doc .vp-demo-code-container > div[class*='language-']:not(:where(.vp-raw *)) {
  margin: 0 !important;
}

.vp-doc > div > :not(.vp-demo):not(.custom-block):not(.vp-api-card) {
  transform: translateX(var(--vp-demo-card-padding));
}

// If there's no header remove margin top from first child
.vp-demo > .vp-demo-body:first-child > :first-child {
  margin-top: 0;
}

.vp-demo-body > p:only-child {
  margin-bottom: 0 !important;
}
</style>
