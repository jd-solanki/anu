<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 5000)
})
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <!-- Alert -->
    <AAlert
      color="info"
      class="relative"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"
        class="text-2xl"
      />
    </AAlert>
    <AAlert
      color="info"
      variant="fill"
      class="relative"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"

        class="text-2xl"
      />
    </AAlert>
    <AAlert
      color="info"
      variant="outline"
      class="relative"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"

        class="text-2xl bg-white dark:bg-dark"
      />
    </AAlert>
    <AAlert
      color="info"
      variant="text"
      class="relative"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"

        class="text-2xl bg-light dark:bg-dark"
      />
    </AAlert>

    <!-- Card -->
    <ACard
      variant="fill"
      color="danger"
      title="Card title"
      subtitle="Chocolate cake tiramisu donut"
    >
      <div class="a-card-body a-card-spacer">
        <p class="text-sm">
          <ALoader
            :loading="loading"

            class="text-3xl"
            title="It's loading..."
            subtitle="Click to stop loading."
          />
          Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate
          bar.
        </p>
      </div>
    </ACard>

    <ACard
      variant="light"
      color="danger"
    >
      <ALoader
        :loading="loading"

        class="text-3xl"
        title="It's loading..."
        subtitle="Click to stop loading."
      />
      <div class="a-card-body a-card-spacer">
        <ATypography
          title="Card title"
          subtitle="Chocolate cake tiramisu donut"
        />
        <p class="text-sm">
          Ice cream sweet pie pie dessert sweet danish. Jelly jelly beans cupcake jelly-o chocolate bonbon chocolate
          bar.
        </p>
      </div>
    </ACard>

    <div class="flex gap-x-2">
      <AChip
        variant="fill"
        class="relative"
      >
        Primary
        <ALoader
          :loading="loading"
        />
      </AChip>
      <AChip class="relative">
        Primary
        <ALoader
          :loading="loading"
        />
      </AChip>
      <AChip
        variant="outline"
        class="relative"
      >
        Primary
        <ALoader
          :loading="loading"

          class="bg-white dark:bg-dark"
        />
      </AChip>
      <AChip
        variant="text"
        class="relative"
      >
        Primary
        <ALoader
          :loading="loading"
          class="bg-light dark:bg-dark"
        />
      </AChip>
    </div>

    <div class="w-full flex gap-6">
      <ABtn
        :loading="loading"
        variant="fill"
      >
        Button
      </ABtn>
    </div>
  </div>
</template>
