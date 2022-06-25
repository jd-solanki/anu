<template>
  <div class="grid-row grid-cols-4">
    <!-- 👉 Sales -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-trending-up"
        color="success"
        variant="light"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Sales', 'text-sm text-gray-500']"
        :subtitle="['2.5k', '!text-xl font-bold text-gray-700']"
      />
    </div>

    <!-- 👉 Revenue -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-dollar"
        variant="light"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Revenue', 'text-sm text-gray-500']"
        :subtitle="['$816', '!text-xl font-bold text-gray-700']"
      />
    </div>

    <!-- 👉 Customer -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-face"
        variant="light"
        color="info"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Customers', 'text-sm text-gray-500']"
        :subtitle="['1.5', '!text-xl font-bold text-gray-700']"
      />
    </div>

    <!-- 👉 Returns -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-navigation"
        variant="light"
        color="danger"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Returns', 'text-sm text-gray-500']"
        :subtitle="['1.5', '!text-xl font-bold text-gray-700']"
      />
    </div>
  </div>
</template>
