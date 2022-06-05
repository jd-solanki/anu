<template>
  <div class="grid grid-cols-2 gap-x-6">
    <AInput
      label="Email"
      type="email"
      value="user@domain.com"
    />

    <!-- 👉 Custom label -->
    <AInput
      id="form-x"
      value="user@domain.com"
      type="email"
    >
      <template #label>
        <label for="a-input-form-x">
          <span>Awesome </span>
          <span class="text-red">*</span>
        </label>
      </template>
    </AInput>
  </div>
</template>
