<template>
  <div class="timeline-wapper" relative ha w-full>
    <ul>
      <slot> </slot>
    </ul>
  </div>
</template>

<style>
.timeline-wapper ul::after {
  position: absolute;
  content: "";
  width: 2px;
  height: 100%;
  background-image: linear-gradient(
    to right,
    rgb(106, 6, 236),
    rgb(220, 0, 240)
  );
}
.timeline-wapper ul .timeline-item:nth-child(odd) {
  float: left;
  clear: right;
  transform: translateX(-30px);
}
.timeline-wapper ul .timeline-item:nth-child(odd) .date {
  right: 20px;
}
.timeline-wapper ul .timeline-item:nth-child(even) {
  float: right;
  clear: left;
  transform: translateX(30px);
}
.timeline-wapper ul .timeline-item .timeline-circle::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: rgb(106, 6, 236);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.timeline-wapper ul .timeline-item:nth-child(odd) .timeline-circle {
  right: -30px;
  transform: translate(50%, -50%);
}
.timeline-wapper ul .timeline-item:nth-child(even) .timeline-circle {
  left: -30px;
  transform: translate(-50%, -50%);
}

/*  Media Query Started  */

@media screen and (max-width: 1224px) {
  .timeline-wapper {
    width: 85%;
  }
}

@media screen and (max-width: 993px) {
  .timeline-wapper {
    width: 80%;
    transform: translateX(15px);
  }
  .timeline-wapper ul::after {
    left: -30px;
  }
  .timeline-wapper ul .timeline-item {
    width: 100%;
    float: none;
    clear: none;
  }
  .timeline-wapper ul .timeline-item:nth-child(odd) {
    text-align: left;
    transform: translateX(0);
  }
  .timeline-wapper ul .timeline-item:nth-child(odd) .date {
    left: 20px;
  }
  .timeline-wapper ul .timeline-item:nth-child(odd) .timeline-circle {
    left: -30px;
    transform: translate(-50%, -50%);
  }
  .timeline-wapper ul .timeline-item:nth-child(even) {
    transform: translateX(0);
  }
}
</style>
