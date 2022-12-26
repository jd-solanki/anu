<script lang="ts" setup>
import type { ComponentApi } from '../../scripts/gen-component-meta'

const props = defineProps<{ api: ComponentApi }>()
const propsHeader = Object.keys(props.api.props[0])
</script>

<template>
  <!-- ℹ️ We will update docs styles soon and add restore the default style of card in API section -->
  <ACard
    title="Props"
    class="shadow-none border border-a-border"
  >
    <div class="a-card-body">
      <div
        v-for="prop in props.api.props"
        :key="prop.name"
        class="not-last-mb-4"
      >
        <span
          class="font-semibold text-[hsla(var(--a-typography-title-color),var(--a-typography-title-opacity))]"
        >{{ prop.name.replace('?', '') }}</span>
        <span class="text-[hsla(var(--a-base-color),var(--a-text-emphasis-light-opacity))]"> : {{ prop.type.replace(/\s*\| (undefined)$/, '') }}</span>
        <span
          v-if="prop.default !== 'unknown'"
          class="text-[hsla(var(--a-base-color),var(--a-text-emphasis-light-opacity))]"
        > = {{ prop.default }}</span>
        <div
          class="!children-[p]-m-0"
          v-html="prop.description"
        />
      </div>
    </div>
  </ACard>
</template>
