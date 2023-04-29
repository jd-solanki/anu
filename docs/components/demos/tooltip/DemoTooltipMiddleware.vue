<script lang="ts" setup>
import type { AFloatingMiddlewareFunc } from 'anu-vue'

const middleware: AFloatingMiddlewareFunc = (referenceEl, floatingEl) => {
  // console.log('referenceEl :>> ', referenceEl)
  // console.log('floatingEl :>> ', floatingEl)

  // We aren't adding any middleware
  return []
}
</script>

<template>
  <ABtn>
    <ATooltip
      :middleware="middleware"
      text="Cotton candy"
    />

    Button
  </ABtn>
</template>
