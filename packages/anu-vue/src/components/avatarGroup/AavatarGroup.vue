<template>
  <div
    inline-flex
    justify-center
    items-center
    class="avatar-groups"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";

const groupsSizeType = ref({
  default: "-1.5rem",
  compact: "-3rem",
  sparse: "-.8rem",
});
</script>

<style>
.avatar-groups>.a-avatar:not(:first-child){
  margin-left: -1.5rem;

}
.avatar-groups>.a-avatar:hover{
  z-index: 1;
}
</style>
