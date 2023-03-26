<template>
  <div class="grid-row sm:grid-cols-2">
    <!-- 👉 Using props -->
    <ACard
      title="Card title"
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
    />

    <!-- 👉 Using custom content (without props) -->
    <ACard>
      <div class="a-card-body a-card-spacer">
        <ATypography
          title="Card title"
          subtitle="Chocolate cake tiramisu donut"
        />
        <p class="text-sm">
          Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar.
        </p>
      </div>
    </ACard>
  </div>
</template>
