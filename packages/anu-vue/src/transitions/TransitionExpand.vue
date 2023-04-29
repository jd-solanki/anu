<!-- Thanks: https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/ -->
<script lang="ts">
import { Transition, defineComponent, h } from 'vue'

export default defineComponent({
  name: 'TransitionExpand',
  setup(_, { slots }) {
    const onEnter = (element: HTMLElement) => {
      const width = getComputedStyle(element).width

      element.style.width = width
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'
      element.style.height = 'auto'

      const height = getComputedStyle(element).height

      element.style.width = ''
      element.style.position = ''
      element.style.visibility = ''
      element.style.height = '0px'

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      // Trigger the animation.
      // We use `requestAnimationFrame` because we need
      // to make sure the browser has finished
      // painting after setting the `height`
      // to `0` in the line above.
      requestAnimationFrame(() => {
        element.style.height = height
      })
    }

    const onAfterEnter = (element: HTMLElement) => {
      element.style.height = 'auto'
    }
    const onLeave = (element: HTMLElement) => {
      const height = getComputedStyle(element).height

      element.style.height = height

      // Force repaint to make sure the
      // animation is triggered correctly.
      // eslint-disable-next-line no-unused-expressions
      getComputedStyle(element).height

      requestAnimationFrame(() => {
        element.style.height = '0px'
      })
    }

    return () => h(
      h(Transition),
      {
        name: 'expand',
        onEnter,
        onAfterEnter,
        onLeave,
      },
      () => slots.default?.(),
    )
  },
})
</script>

<style>
.expand-enter-active,
.expand-leave-active {
  overflow: hidden;
  transition: block-size var(--expand-transition-duration, 0.25s) ease;
}

.expand-enter-from,
.expand-leave-to {
  block-size: 0;
}
</style>

<style scoped>
* {
  backface-visibility: hidden;
  perspective: 1000px;
  transform: translateZ(0);
  will-change: block-size;
}
</style>
