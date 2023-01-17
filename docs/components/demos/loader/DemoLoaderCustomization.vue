<template>
  <div class="flex justify-between text-6xl">
    <ALoader class="[--a-ring-stroke:5] [--a-arc-stroke:20]" />

    <ALoader
      color="danger"
      class="[--a-ring-color:#33ee88] [--a-ring-opacity:1] [--a-spin-duration:4s]"
    />

    <ALoader class="[--a-ring-stroke:0] stroke-cap-round rotate-y-180" />

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
