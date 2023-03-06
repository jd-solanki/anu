<template>
  <div class="flex flex-wrap gap-4">
    <ABtn>
      <ATooltip text="Hello!" />
      Hover Over Me
    </ABtn>
    <ABtn>
      <!-- ℹ️ You can also customize `--a-tooltip-bg-c` CSS var for changing tooltip background -->
      <ATooltip class="[&_.a-tooltip]-bg-danger">
        <span class="a-tooltip-text">
          <i class="i-bx-shield-x me-1" />
          <span>Protection is disabled</span>
        </span>
      </ATooltip>
      Scan Skipped
    </ABtn>
  </div>
</template>
