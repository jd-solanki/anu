<script lang="ts" setup>
  let targetRef = ref<[string|undefined,HTMLElement|undefined]>([undefined,undefined]);
  function hijack(e:Event){
    let target = e.target as HTMLElement;
    targetRef.value = [target.innerText,target]
  }
</script>

<template>
  <div
    class="button-group"
    relative
    inline-flex
    @click.stop="hijack"
    overflow-hidden
  >
    <slot :eventTarget="targetRef"> </slot>
  </div>
</template>

<style>
.button-group button:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none;
}
.button-group button:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
