<template>
  <div class="flex items-center flex-wrap gap-8">
    <!-- Icon -->
    <ABadge :content="9">
      <i class="i-bx-bell w-6 h-6" />
    </ABadge>

    <!-- Button -->
    <ABadge :content="9">
      <ABtn>
        Button
      </ABtn>
    </ABadge>

    <!-- Avatar -->
    <ABadge
      :content="9"
      offset-x="16"
      offset-y="16"
    >
      <AAvatar src="/images/demo/portrait-1.jpg" />
    </ABadge>
  </div>
</template>
