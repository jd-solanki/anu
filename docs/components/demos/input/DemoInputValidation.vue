<script setup lang="ts">
import { useField } from 'vee-validate'

const isRequired = (val: string) => (val.trim() ? true : 'This is required')

const { errorMessage: usernameError, value: username } = useField('username', isRequired)
</script>

<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch">
    <div>
      <AInput
        v-model="username"
        :error="usernameError"
        label="Username"
        hint="Error message will get displayed here"
      />
    </div>
  </div>
</template>
