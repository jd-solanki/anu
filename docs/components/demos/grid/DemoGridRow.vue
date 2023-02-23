<template>
  <div class="grid-row grid-cols-4">
    <div
      v-for="col in 4"
      :key="col"
      class="bg-primary bg-opacity-35 h-10 w-full rounded-lg"
    />
  </div>
</template>
