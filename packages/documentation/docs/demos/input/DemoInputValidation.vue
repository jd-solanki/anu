<script setup>
import { useField } from 'vee-validate';

const isRequired = val => (val && val.trim() ? true : 'This is required')

const { errorMessage, value } = useField('fieldName', isRequired)
</script>

<template>
  <AInput
    v-model="value"
    :error="errorMessage"
    label="Username"
    hint="Error message will get displayed here"
  />
</template>
