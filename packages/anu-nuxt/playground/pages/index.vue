<script setup lang="ts">
import { ref } from 'vue'

const isDialogShown = ref(false)
</script>

<template>
  <div class="max-w-2xl mx-auto space-y-10">
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
      <AAvatar src="/images/demo/portrait-1.jpg" />
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
        <AAvatar src="/images/demo/portrait-1.jpg" />
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
