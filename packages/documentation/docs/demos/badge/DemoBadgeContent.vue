<template>
  <div class="flex flex-wrap gap-4">
    <ABadge :badge-content="9">
      <i class="inline-block i-bx-bell w-6 h-6" />
    </ABadge>
    <ABadge>
      <template #badgeContent>
        <i class="inline-block i-bx-smile w-3 h-3" />
      </template>
      <i class="inline-block i-bx-bell w-6 h-6" />
    </ABadge>
  </div>
</template>
