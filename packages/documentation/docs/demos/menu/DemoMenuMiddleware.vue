<script lang="ts" setup>
const items = [
  { title: 'Donut jujubes' },
  { title: 'Sesame snaps' },
  { title: 'I love jelly' },
  { title: 'Cake gummi', disable: true },
]

const middleware = (referenceEl: HTMLElement, floatingEl: HTMLElement) => {
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
