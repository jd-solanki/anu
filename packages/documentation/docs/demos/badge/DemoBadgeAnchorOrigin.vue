<template>
  <div class="flex flex-wrap gap-8">
    <ABadge
      :badge-content="9"
      :anchor-origin="{ vertical: 'top', horizontal: 'left' }"
    >
      <i class="inline-block i-bx-bell w-6 h-6" />
    </ABadge>
    <ABadge
      :badge-content="9"
      :anchor-origin="{ vertical: 'bottom', horizontal: 'left' }"
    >
      <i class="inline-block i-bx-bell w-6 h-6" />
    </ABadge>
    <ABadge
      :badge-content="9"
      :anchor-origin="{ vertical: 'top', horizontal: 'right' }"
    >
      <i class="inline-block i-bx-bell w-6 h-6" />
    </ABadge>
    <ABadge
      :badge-content="9"
      :anchor-origin="{ vertical: 'bottom', horizontal: 'right' }"
    >
      <i class="inline-block i-bx-bell w-6 h-6" />
    </ABadge>
  </div>
</template>
