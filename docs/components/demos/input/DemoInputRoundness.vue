<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch">
    <!-- 👉 rounded-0 -->
    <AInput
      input-wrapper-classes="rounded-0"
      placeholder="rounded-0"
    />

    <!-- 👉 rounded -->
    <AInput
      input-wrapper-classes="rounded"
      placeholder="rounded"
    />

    <!-- 👉 default -->
    <AInput placeholder="default" />

    <!-- 👉 rounded-xl -->
    <AInput
      input-wrapper-classes="rounded-xl"
      placeholder="rounded-xl"
    />

    <!-- 👉 rounded-2xl -->
    <AInput
      input-wrapper-classes="rounded-2xl"
      placeholder="rounded-2xl"
    />
  </div>
</template>
