<template>
  <transition
    name="fade"
    @after-leave="$emit('destroy')"
  >
    <div v-show="visible" class="message">
      <div
        class="text-base"
        @mouseenter="clearTimer"
        @mouseleave="startTimer"
      >
        <AAlert :color="props.color" variant="fill">
          {{ content }}
        </AAlert>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { type PropType, ref } from "vue";
import {AAlert} from "anu-vue";

const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  duration: {
    type: Number,
    default: 3000
  },
  color: {
    type: String as PropType<"success" | "info" | "warning" | "danger">,
    default: "info"
  }
})
const emit = defineEmits(['destroy'])

const visible = ref(false)
let stopTimer: undefined | ReturnType<typeof setTimeout>

function startTimer() {
  if (props.duration === 0) return
  stopTimer = setTimeout(() => {
    close()
  }, props.duration)
}

function clearTimer() {
  if (stopTimer) {
    clearTimeout(stopTimer)
  }
}

function close() {
  visible.value = false;
}

onMounted(() => {
  startTimer()
  visible.value = true
})

defineExpose({
  visible,
  close,
})
</script>

<style scoped>
.message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  //background-color: white;
  //padding: 10px 20px;
  //border-radius: 5px;
  //box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 3000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
