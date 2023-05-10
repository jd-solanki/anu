<template>
  <div class="grid-row sm:grid-cols-4 grid-cols-2">
    <!-- 👉 Sales -->
    <div class="flex gap-x-3 items-center">
      <AAvatar
        icon="i-bx-trending-up"
        color="success"
        class="rounded-lg text-[1.25rem]"
      />
      <ATypography
        :title="['Sales', 'text-sm font-normal !text-medium-emphasis']"
        :subtitle="['2.5k', 'text-xl font-semibold !text-high-emphasis']"
      />
    </div>

    <!-- 👉 Revenue -->
    <div class="flex gap-x-3 items-center">
      <AAvatar
        icon="i-bx-dollar"
        class="rounded-lg text-[1.25rem]"
      />
      <ATypography
        :title="['Revenue', 'text-sm !text-medium-emphasis font-normal']"
        :subtitle="['$816', 'text-xl font-semibold !text-high-emphasis']"
      />
    </div>

    <!-- 👉 Customer -->
    <div class="flex gap-x-3 items-center">
      <AAvatar
        icon="i-bx-face"
        color="info"
        class="rounded-lg text-[1.25rem]"
      />
      <ATypography
        :title="['Customers', 'text-sm !text-medium-emphasis font-normal']"
        :subtitle="['1.5', 'text-xl font-semibold !text-high-emphasis']"
      />
    </div>

    <!-- 👉 Returns -->
    <div class="flex gap-x-3 items-center">
      <AAvatar
        icon="i-bx-navigation"
        color="danger"
        class="rounded-lg text-[1.25rem]"
      />
      <ATypography
        :title="['Returns', 'text-sm !text-medium-emphasis font-normal']"
        :subtitle="['1.5', 'text-xl font-semibold !text-high-emphasis']"
      />
    </div>
  </div>
</template>
