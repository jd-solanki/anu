import { useCssVar } from '@vueuse/core'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'

// Thanks: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
// ❗ Caveat: If scroll-behavior: smooth is applied to body then dialog close will scroll the body
export function useDOMScrollLock(modelValue: Ref<boolean>) {
  const refRoot = ref()

  const scrollbarWidth = useCssVar('--scrollbar-width', refRoot)
  const windowScrollTop = useCssVar('--window-scroll-top', refRoot)

  watch(modelValue, val => {
    if (!scrollbarWidth.value) {
      // Thanks: https://stackoverflow.com/a/56283274/10796681
      scrollbarWidth.value = `${window.innerWidth - document.body.clientWidth}px`
    }

    const classes = document.documentElement.classList

    if (val) {
      windowScrollTop.value = `-${window.scrollY}px`
      classes.add('scroll-lock')
    }
    else {
      const scrollY = windowScrollTop.value
      classes.remove('scroll-lock')
      window.scrollTo(0, Number.parseInt(scrollY || '0') * -1)
    }
  })
}
