<template>
  <div class="grid-row sm:grid-cols-2">
    <!-- 👉 1st card -->
    <ACard
      title="Card title"
      subtitle="Chocolate cake tiramisu donut"
    >
      <img
        src="/images/demo/minimal-1.jpg"
        alt="girl"
      >

      <div class="a-card-body a-card-spacer">
        <p class="text-sm">
          Macaroon cake powder pie cake cake gingerbread oat cake chocolate cake.
        </p>
        <ABtn>Read more</ABtn>
      </div>
    </ACard>

    <!-- 👉 2nd card -->
    <ACard
      title="Card title"
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
      img="/images/demo/minimal-2.jpg"
    >
      <div class="a-card-body">
        <ABtn>Read more</ABtn>
      </div>
    </ACard>

    <!-- 👉 Awesome mobile -->
    <ACard class="sm:col-span-2">
      <!-- Grid -->
      <div class="grid-row sm:grid-cols-[2fr_5fr] gap-x-0 gap-0 items-center">
        <!-- Image -->
        <img
          src="/images/demo/minimal-3-1.png"
          alt="minimal-3"
        >
        <!-- Information -->
        <div class="a-card-body a-card-spacer">
          <ATypography
            title="Awesome mobile"
            subtitle="Biscuit liquorice apple pie candy canes"
            :text="['Donut jelly beans cake lollipop sweet biscuit. Pie apple pie powder apple pie gummi bears. Jelly apple pie croissant candy canes liquorice halvah.', 'text-sm']"
          />

          <!-- Action buttons -->
          <div class="flex flex-wrap gap-x-4 gap-y-2">
            <ABtn icon="i-bx-cart">
              Add to cart
            </ABtn>
            <ABtn
              variant="light"
              icon="i-bx-heart"
            >
              Wishlist
            </ABtn>
          </div>
        </div>
      </div>
    </ACard>
  </div>
</template>
