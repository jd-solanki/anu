<template>
  <div class="grid-row items-center grid-cols-[auto_1fr_auto]">
    <!-- 👉 PayPal -->
    <ABtn
      icon="i-bx-dollar"
      icon-only
      variant="light"
      color="success"
      class="before:hidden cursor-auto"
    />
    <ATypography
      title="PayPal"
      subtitle="last payment"
      class="text-sm"
    />
    <ATypography
      text="+$789"
      class="text-sm text-success font-semibold place-self-end"
    />

    <!-- 👉 Credit card -->
    <ABtn
      icon="i-bx-credit-card"
      icon-only
      variant="light"
      color="danger"
      class="before:hidden cursor-auto"
    />
    <ATypography
      title="Credit card"
      subtitle="ordered books"
      class="text-sm"
    />
    <ATypography
      text="-$13.6"
      class="text-sm text-danger font-semibold place-self-end"
    />

    <!-- 👉 Server storage -->
    <ABtn
      icon="i-bx-server"
      icon-only
      variant="light"
      color="warning"
      class="before:hidden cursor-auto"
    />
    <ATypography
      title="Server storage"
      subtitle="90% storage used"
      class="text-sm"
    />
    <ATypography
      text="4 minutes ago"
      class="text-sm text-warning font-semibold place-self-end"
    />
  </div>
</template>
