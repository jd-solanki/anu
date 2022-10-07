<script lang="ts" setup>
import type { ComponentApi } from '../../../../scripts/gen-component-meta'

const props = defineProps<{ api: ComponentApi }>()
const propsHeader = Object.keys(props.api.props[0])
</script>

<template>
  <h3>Props</h3>
  <table class="text-[0.85rem]">
    <!-- 👉 thead -->
    <thead>
      <tr>
        <th
          v-for="header in propsHeader"
          :key="header"
          class="capitalize"
        >
          {{ header }}
        </th>
      </tr>
    </thead>

    <!-- 👉 tbody -->
    <tbody>
      <tr
        v-for="prop in props.api.props"
        :key="prop.name"
        :class="{ 'opacity-50': !prop.required }"
      >
        <td
          v-for="(value, _, i) in prop"
          :key="i"
          v-html="value"
        />
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
th, td {
    padding: 12px;
}
</style>
