<script lang="ts" setup>
const log = () => {
  console.log('me')
}
</script>

<template>
  <div class="grid-row sm:grid-cols-2 place-items-stretch">
    <div>
      <AInput class="w-12">
        <template #append-inner>
          <span
            class="cursor-pointer"
            @click.stop="log"
          >%</span>
        </template>
      </AInput>
    </div>
  </div>
</template>
