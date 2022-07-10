<template>
  <div class="grid-row sm:grid-cols-2 cards-demo-container">
    <ACard
      title="Card title"
      subtitle="Chocolate cake tiramisu donut"
    >
      <img
        src="/images/demo/minimal-1.jpg"
        alt="girl"
      >

      <div class="card-body">
        <span>Macaroon cake powder pie cake cake gingerbread oat cake chocolate cake.</span>
        <ABtn>Read more</ABtn>
      </div>
    </ACard>

    <ACard
      title="Card title"
      subtitle="Chocolate cake tiramisu donut"
      text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
      img="/images/demo/minimal-2.jpg"
    >
      <div class="card-body">
        <ABtn>Read more</ABtn>
      </div>
    </ACard>

    <ACard class="col-span-2">
      <div class="grid-row grid-cols-[2fr_5fr] gap-x-0 items-center">
        <img
          src="/images/demo/minimal-3-1.png"
          alt="minimal-3"
        >
        <div class="card-body">
          <ATypography
            title="Awesome mobile"
            subtitle="Biscuit liquorice apple pie candy canes"
            :text="['Donut jelly beans cake lollipop sweet biscuit. Pie apple pie powder apple pie gummi bears. Jelly apple pie croissant candy canes liquorice halvah.', 'text-sm']"
          />
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
