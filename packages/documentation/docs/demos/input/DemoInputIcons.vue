<template>
  <div class="grid grid-cols-2 gap-6">
    <div>
      <AInput
        type="password"
        placeholder="Confirm password"
        append-inner-icon="i-bx-check-double"
      />
    </div>
    <div>
      <AInput
        type="text"
        placeholder="Enter your email"
        prepend-inner-icon="i-bx-at"
        hint="We never share your email with anyone"
      />
    </div>
    <div>
      <AInput
        type="text"
        placeholder="Enter your username"
        prepend-icon="i-bx-user"
      />
    </div>
    <div>
      <AInput
        type="password"
        placeholder="Enter your password"
        append-icon="i-bx-lock"
      />
    </div>
  </div>
</template>
