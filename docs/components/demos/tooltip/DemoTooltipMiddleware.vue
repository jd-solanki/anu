<script lang="ts" setup>
const middleware = (referenceEl: HTMLElement, floatingEl: HTMLElement) => {
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
