<script lang="ts" setup>
import { AConfig } from 'anu-vue';
import { ref } from 'vue';

const color = ref('danger')

setTimeout(() => {
  console.log('updating...');
  color.value = 'success'
}, 2000);
</script>

<template>
    <ACard
      title="Playground"
      class="m-8"
    >
      <a-alert>
      <p>This is alert</p>
      <a-btn>Button</a-btn>
    </a-alert>
    <a-btn>Button</a-btn>
    </ACard>

    <a-alert>
      <p>This is alert</p>
      <a-btn>Button</a-btn>
    </a-alert>
    <a-btn>Button</a-btn>

    <hr>

    <ACard
      title="Playground"
      class="m-8"
    >
      <a-alert>
      <p>This is alert</p>
      <AConfig :props="{ ABtn: { variant: 'light', color } }">
      <a-btn>Button</a-btn>
      </AConfig>
    </a-alert>
    <a-btn>Button</a-btn>
    </ACard>

    <a-alert>
      <p>This is alert</p>
      <a-btn>Button</a-btn>
    </a-alert>
    <a-btn>Button</a-btn>

</template>
