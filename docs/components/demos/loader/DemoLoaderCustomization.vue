<template>
  <div class="flex gap-8 text-3xl">
    <ALoader class="[--a-ring-stroke:10] [--a-arc-stroke:10]" />

    <ALoader
      color="primary"
      class="[--a-ring-color:hsla(var(--a-base-c),0.1)] [--a-ring-opacity:1] [--a-spin-duration:1.5s]"
    />

    <ALoader class="[--a-ring-stroke:0] [&_.a-spinner-arc]-stroke-cap-round rotate-y-180" />

    <ALoader class="[--a-ring-stroke:180] [--a-arc-stroke:10] [--a-ring-opacity:.5] [--a-arc-color:white] dark:[--a-arc-color:black] animate-pulse-alt" />

    <ALoader
      color="success"
      class="[--a-ring-stroke:0] hover:[--a-spin-duration:4s] stroke-cap-round animate-circular-dash"
    />

    <ALoader
      color="primary"
      class="[--a-ring-stroke:200] [--a-arc-stroke:200] animate-circular-dash"
    />
  </div>
</template>
