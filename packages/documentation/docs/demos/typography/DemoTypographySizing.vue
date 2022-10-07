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
    <ATypography
      text="+$789"
      class="text-sm text-success font-semibold place-self-end"
    />

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
    <ATypography
      text="-$13.6"
      class="text-sm text-danger font-semibold place-self-end"
    />

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
    <ATypography
      text="4 minutes ago"
      class="text-sm text-warning font-semibold place-self-end"
    />
  </div>
</template>
