<script lang="ts" setup>
import { ref } from 'vue'

const primary = ref(true)
const success = ref(true)
const info = ref(true)
const warning = ref(true)
const danger = ref(true)
</script>

<template>
  <div class="grid gap-y-3">
    <ACheckbox
      v-model="primary"
      color="primary"
    >
      Primary
    </ACheckbox>

    <ACheckbox
      v-model="success"
      color="success"
    >
      Success
    </ACheckbox>

    <ACheckbox
      v-model="info"
      color="info"
    >
      Info
    </ACheckbox>

    <ACheckbox
      v-model="warning"
      color="warning"
    >
      Warning
    </ACheckbox>

    <ACheckbox
      v-model="danger"
      color="danger"
    >
      Danger
    </ACheckbox>
  </div>
</template>
