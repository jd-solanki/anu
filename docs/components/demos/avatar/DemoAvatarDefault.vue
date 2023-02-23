<template>
  <div class="flex flex-wrap gap-4">
    <!-- Content prop -->
    <AAvatar content="A" />

    <!-- Default slot -->
    <AAvatar color="success">
      JD
    </AAvatar>

    <!-- icon -->
    <AAvatar
      color="info"
      icon="i-bx-support"
    />

    <!-- Image -->
    <AAvatar src="/images/demo/portrait-1.jpg" />
  </div>
</template>
