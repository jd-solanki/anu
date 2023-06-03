<script lang="ts" setup>
import { AConfig } from 'anu-vue'
import { ref } from 'vue'

const color = ref('primary')

setTimeout(() => {
  console.log('Updating color...')
  color.value = 'warning'
}, 2000)
</script>

<template>
  <div class="m-8">
    <div
      class="p-4 rounded-lg"
      style="background: hsla(var(--a-surface-c),var(--un-bg-opacity,1))"
    >
      <ACard>
        <ABtn>Button Before</ABtn>
        <AAlert>
          Awesome
          <ABtn :color="color">
            Button
          </ABtn>
          <AConfig :props="{ ABtn: { color } }">
            <ABtn>configured</ABtn>
          </AConfig>
          <ABtn>Un</ABtn>
        </AAlert>
        <ABtn>Button</ABtn>
      </ACard>
      <AAlert>Alert outside card</AAlert>
    </div>
  </div>
</template>
