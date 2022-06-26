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
      <div class="card-body">
        <ATypography
          title="Card title"
          subtitle="Chocolate cake tiramisu donut"
        />
        <span>Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar.</span>
      </div>
    </ACard>
  </div>
</template>
