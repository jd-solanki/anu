<script lang="ts" setup>
import { AConfig } from 'anu-vue'
import { ref } from 'vue'

const color = ref('danger')
const scale = ref(1)

setTimeout(() => {
  console.log('updating...')
  color.value = 'success'
  scale.value = 1.1
}, 2000)
</script>

<template>
  <ACard
    title="Playground"
    class="m-8"
  >
    <AAlert>
      <p>This is alert</p>
      <ABtn>Button</ABtn>
    </AAlert>
    <ABtn>Button</ABtn>
  </ACard>

  <AAlert>
    <p>This is alert</p>
    <ABtn>Button</ABtn>
  </AAlert>
  <ABtn>Button</ABtn>

  <hr>

  <ACard
    title="Playground"
    class="m-8"
  >
    <AAlert>
      <p>This is alert</p>
      <ABtn>before</ABtn>
      <AConfig :props="{ ABtn: { variant: 'light', color } }">
        <ABtn>Button</ABtn>
      </AConfig>
      <ABtn>after</ABtn>
    </AAlert>
    <ABtn>Button</ABtn>
  </ACard>

  <AConfig :props="{ ABtn: { variant: 'light', color: 'info', style: { scale } } }">
    <AAlert>
      <p>This is alert</p>
      <ABtn>Button</ABtn>
    </AAlert>
    <ABtn>Button</ABtn>
  </AConfig>
</template>
