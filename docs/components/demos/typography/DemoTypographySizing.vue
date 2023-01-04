<template>
  <div class="grid-row items-center grid-cols-[auto_1fr_auto]">
    <!-- 👉 PayPal -->
    <AAvatar
      icon="i-bx-dollar"
      color="success"
      class="rounded-lg text-[1.25rem]"
    />
    <ATypography
      title="PayPal"
      subtitle="last payment"
      class="text-sm"
    />
    <span class="text-success text-sm font-semibold ms-auto">+$789</span>

    <!-- 👉 Credit card -->
    <AAvatar
      icon="i-bx-credit-card"
      color="danger"
      class="rounded-lg text-[1.25rem]"
    />
    <ATypography
      title="Credit card"
      subtitle="ordered books"
      class="text-sm"
    />
    <span class="text-danger text-sm font-semibold ms-auto">-$13.6</span>

    <!-- 👉 Server storage -->
    <AAvatar
      icon="i-bx-server"
      color="warning"
      class="rounded-lg text-[1.25rem]"
    />
    <ATypography
      title="Server storage"
      subtitle="90% storage used"
      class="text-sm"
    />
    <span class="text-warning text-sm font-semibold ms-auto">4 minutes ago</span>
  </div>
</template>
