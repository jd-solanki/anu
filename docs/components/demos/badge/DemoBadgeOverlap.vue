<template>
  <div class="flex flex-wrap gap-4">
    <ABadge>
      <AAvatar
        icon="i-bx-home"
        class="rounded-none"
      />
    </ABadge>

    <ABadge :overlap="false">
      <AAvatar
        icon="i-bx-home"
        class="rounded-none"
      />
    </ABadge>

    <ABadge
      offset-x="16"
      offset-y="16"
    >
      <AAvatar icon="i-bx-home" />
    </ABadge>
  </div>
</template>
