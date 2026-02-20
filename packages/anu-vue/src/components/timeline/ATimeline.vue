<template>
  <div flex w-full justify-center>
    <div class="timeline" w-80per grid>
      <TimelineWapper>
        <slot></slot>
      </TimelineWapper>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "@vue/runtime-core";
import TimelineWapper from "./TimelimeWapper.vue";
defineComponent({
  TimelineWapper,
});
</script>

<style>
</style>
