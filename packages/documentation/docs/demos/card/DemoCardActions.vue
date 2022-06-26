<template>
  <div class="grid-row sm:grid-cols-2">
    <!-- 👉 Usage 1 -->
    <ACard
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
    >
      <template #title>
        <div class="flex justify-between">
          <span>Card title</span>
          <div class="flex items-center gap-x-3 text-base text-light-emphasis">
            <i class="cursor-pointer i-bx-chevron-down" />
            <i class="cursor-pointer i-bx-refresh" />
            <i class="cursor-pointer i-bx-x" />
          </div>
        </div>
      </template>
    </ACard>

    <!-- 👉 Usage 2 -->
    <ACard
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
    >
      <template #title>
        <div class="flex justify-between items-center">
          <span>Card title</span>
          <a
            target="_blank"
            href="https://github.com/jd-solanki/anu"
            class="!text-light-emphasis underline text-sm"
          >Link</a>
        </div>
      </template>
    </ACard>
  </div>
</template>
