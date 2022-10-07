<script setup>
import { useField } from 'vee-validate'

const isRequired = val => (val && val.trim() ? true : 'This is required')

const { errorMessage, value } = useField('fieldName', isRequired)
</script>

<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch">
    <div>
      <AInput
        v-model="value"
        :error="errorMessage"
        label="Username"
        hint="Error message will get displayed here"
      />
    </div>
  </div>
</template>
