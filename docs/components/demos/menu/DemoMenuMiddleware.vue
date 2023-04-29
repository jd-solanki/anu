<script lang="ts" setup>
import type { AFloatingMiddlewareFunc } from 'anu-vue'

const items = [
  { text: 'Donut jujubes' },
  { text: 'Sesame snaps' },
  { text: 'I love jelly' },
  { text: 'Cake gummi', disable: true },
]

const middleware: AFloatingMiddlewareFunc = (referenceEl, floatingEl) => {
  // console.log('referenceEl :>> ', referenceEl)
  // console.log('floatingEl :>> ', floatingEl)

  // We aren't adding any middleware
  return []
}
</script>

<template>
  <ABtn>
    <AMenu :middleware="middleware">
      <AList :items="items" />
    </AMenu>

    Open Menu
  </ABtn>
</template>
