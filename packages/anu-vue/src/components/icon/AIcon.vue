<script lang="ts" setup>
import { useColor } from '@/composables';
import { color as colorProp } from '@/composables/useProps';
import { PropType } from 'vue';

const props = defineProps({
  /**
   * Icon name
   */
  icon: {
    type: String as PropType<`i-${string}`>,
    required: true,
  },

  /**
   * Icon color
   */
  color: colorProp,
})

defineOptions({
  name: 'AIcon',
})

const { styles } = useColor(toRef(props, 'color'), 'icon-color')
</script>

<template>
  <button type="button" :style="styles" class="a-icon-btn relative rounded-full aspect-square leading-0 m--1 focus:after:opacity-35 focus:after:scale-125 focus:outline-none after:content-empty after:absolute after:inset-0 after:opacity-0 after:transform after:transition-all isolate after:z--1 after:rounded-inherit after:border-3 after:border-solid after:border-color-current">
    <i aria-hidden="true" class="m-1" :class="props.icon" v-bind="$attrs"></i>
  </button>
</template>
