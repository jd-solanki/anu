<script lang="ts" setup>
import { toFormValidator } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'

const validationSchema = toFormValidator(
  zod.object({
    email: zod.string({ required_error: 'Email is required' }).min(1).email({ message: 'Must be a valid email' }),
    password: zod.string({ required_error: 'Password is required' }).min(1).min(8, { message: 'Password is too short' }),
  }),
)

const { handleSubmit, errors } = useForm({
  validationSchema,
})

/*
    setting `validateOnValueUpdate: false` won't trigger validation on value change
    Docs: https://vee-validate.logaretm.com/v4/guide/composition-api/validation/#validation-behavior
*/
const { value: email } = useField<string>('email', undefined, {
  validateOnValueUpdate: false,
})
const { value: password } = useField<string>('password', undefined, {
  validateOnValueUpdate: false,
})

const onSubmit = handleSubmit((values, { resetForm }) => {
  alert(JSON.stringify(values, null, 2))

  resetForm()
})
</script>

<template>
  <ACard>
    <div class="a-card-body py-18">
      <form
        class="grid-row mx-auto max-w-1/2 grid-flow-rows justify-items-stretch content-center"
        @submit="onSubmit"
      >
        <ATypography
          :title="['Hello Again!', 'text-2xl']"
          subtitle="Welcome back, You've been missed"
          class="mb-4"
        />
        <AInput
          v-model="email"
          name="email"
          type="email"
          label="Email"
          :error="errors.email"
        />
        <AInput
          v-model="password"
          name="password"
          type="password"
          label="Password"
          :error="errors.password"
        />
        <ABtn>Submit</ABtn>
      </form>
    </div>
  </ACard>
</template>
