<template>
  <div class="grid-row sm:grid-cols-4 grid-cols-2">
    <!-- 👉 Sales -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-trending-up"
        color="success"
        variant="light"
        class="before:hidden cursor-auto"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Sales', 'text-sm font-normal !text-medium-emphasis']"
        :subtitle="['2.5k', 'text-xl font-bold !text-high-emphasis']"
      />
    </div>

    <!-- 👉 Revenue -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-dollar"
        variant="light"
        class="before:hidden cursor-auto"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Revenue', 'text-sm !text-medium-emphasis font-normal']"
        :subtitle="['$816', 'text-xl font-bold !text-high-emphasis']"
      />
    </div>

    <!-- 👉 Customer -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-face"
        variant="light"
        color="info"
        class="before:hidden cursor-auto"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Customers', 'text-sm !text-medium-emphasis font-normal']"
        :subtitle="['1.5', 'text-xl font-bold !text-high-emphasis']"
      />
    </div>

    <!-- 👉 Returns -->
    <div class="flex gap-x-3 items-center">
      <ABtn
        icon-only
        icon="i-bx-navigation"
        variant="light"
        color="danger"
        class="before:hidden cursor-auto"
      />
      <ATypography
        class="!children:leading-tight"
        :title="['Returns', 'text-sm !text-medium-emphasis font-normal']"
        :subtitle="['1.5', 'text-xl font-bold !text-high-emphasis']"
      />
    </div>
  </div>
</template>
