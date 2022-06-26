import { useCssVar } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

export const useDOMScrollLock = (modelValue: Ref<boolean>) => {
  const refRoot = ref()
  const scrollbarWidth = useCssVar('--scrollbar-width', refRoot)

  watch(modelValue, val => {
    if (!scrollbarWidth.value) {
      // Thanks: https://stackoverflow.com/a/56283274/10796681
      scrollbarWidth.value = `${window.innerWidth - document.body.clientWidth}px`
    }
    document.documentElement.style.overflowY = val ? 'hidden' : 'auto'
  })
}
