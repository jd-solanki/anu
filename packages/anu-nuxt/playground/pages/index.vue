<script setup lang="ts">
const isDialogShown = ref(false)
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-10 my-8">
    <ATypography
      class="text-2xl font-semibold"
      title="Anu Playground"
    />
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
        :text="['+$789', 'text-success']"
        class="text-sm font-semibold place-self-end"
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
        :text="['-$13.6', 'text-danger']"
        class="text-sm font-semibold place-self-end"
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
        :text="['4 minutes ago', 'text-warning']"
        class="text-sm font-semibold place-self-end"
      />
    </div>

    <div class="grid-row">
      <AAlert>
        Fruitcake I love liquorice apple pie croissant.
      </AAlert>

      <AAlert color="success">
        Fruitcake I love liquorice apple pie croissant.
      </AAlert>

      <AAlert color="info">
        Fruitcake I love liquorice apple pie croissant.
      </AAlert>

      <AAlert color="warning">
        Fruitcake I love liquorice apple pie croissant.
      </AAlert>

      <AAlert color="danger">
        Fruitcake I love liquorice apple pie croissant.
      </AAlert>
    </div>

    <div class="flex flex-wrap gap-4">
      <!-- Content prop -->
      <AAvatar content="A" />

      <!-- Default slot -->
      <AAvatar color="success">
        JD
      </AAvatar>

      <!-- icon -->
      <AAvatar
        color="info"
        icon="i-bx-support"
      />

      <!-- Image -->
      <AAvatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
    </div>

    <div class="flex items-center flex-wrap gap-8">
      <!-- Icon -->
      <ABadge :content="9">
        <i class="i-bx-bell w-6 h-6" />
      </ABadge>

      <!-- Button -->
      <ABadge :content="9">
        <ABtn>
          Button
        </ABtn>
      </ABadge>

      <!-- Avatar -->
      <ABadge
        :content="9"
        offset-x="16"
        offset-y="16"
      >
        <AAvatar src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" />
      </ABadge>
    </div>

    <div class="flex flex-wrap gap-4">
      <ABtn>Primary</ABtn>

      <ABtn color="success">
        Success
      </ABtn>

      <ABtn color="info">
        Info
      </ABtn>

      <ABtn color="warning">
        Warning
      </ABtn>

      <ABtn color="danger">
        Danger
      </ABtn>
    </div>

    <div class="grid-row sm:grid-cols-2 cards-demo-container">
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

    <div class="flex flex-wrap gap-2">
      <AChip>Primary</AChip>
      <AChip color="success">
        Success
      </AChip>
      <AChip color="info">
        Info
      </AChip>
      <AChip color="warning">
        Warning
      </AChip>
      <AChip color="danger">
        Danger
      </AChip>
    </div>

    <div>
      <ADialog
        v-model="isDialogShown"
        title="Dialog title"
        subtitle="Chocolate cake tiramisu donut"
        text="Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate bar."
      />

      <ABtn @click="isDialogShown = true">
        Show dialog
      </ABtn>
    </div>
  </div>
</template>
