<script lang="ts" setup>
defineOptions({
  name: 'ASpinner',
})
</script>

<template>
  <svg
    fill="none"
    viewBox="-120,-120,240,240"
    xmlns="http://www.w3.org/2000/svg"
    class="a-spinner shrink-0 inline-block em:w-[1.2em] aspect-square animate-spin animate-duration-[var(--a-spin-duration,_1s)]"
  >
    <g class="-rotate-90">
      <circle
        class="a-spinner-ring stroke-[var(--a-ring-color,_currentColor)] stroke-width-[var(--a-ring-stroke,_40)] opacity-[var(--a-ring-opacity,_.25)]"
        r="100"
      />
      <circle
        r="100"
        class="a-spinner-arc stroke-[var(--a-arc-color,_currentColor)] stroke-width-[var(--a-arc-stroke,_40)] opacity-[var(--a-arc-opacity)]"
        stroke-dasharray="219.9114857512855 628.3185307179587"
        stroke-dashoffset="0"
      />
    </g>
  </svg>
</template>

<style scoped>
@keyframes circular-dash {
  0% {
    stroke-dasharray: 1, 628;
    stroke-dashoffset: 0px;
  }

  50% {
    stroke-dasharray: 300, 628;
    stroke-dashoffset: -100px;
  }

  to {
    stroke-dasharray: 300, 628;
    stroke-dashoffset: -600px;
  }
}

.animate-circular-dash .a-spinner-arc {
  animation: circular-dash 2s ease-in-out infinite;
}
</style>
