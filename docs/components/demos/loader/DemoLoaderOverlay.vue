<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <ABtn @click="loading = !loading">
      Toggle loading
    </ABtn>

    <!-- Alert -->
    <AAlert color="info">
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"
        overlay
        class="text-2xl bg-[#ddf3ff] dark:bg-[#15262e]"
      />
    </AAlert>
    <AAlert
      color="info"
      variant="fill"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"
        overlay
        class="text-2xl"
      />
    </AAlert>
    <AAlert
      color="info"
      variant="outline"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"
        overlay
        class="text-2xl bg-white dark:bg-dark"
      />
    </AAlert>
    <AAlert
      color="info"
      variant="text"
    >
      Fruitcake I love liquorice apple pie croissant.
      <ALoader
        :loading="loading"
        overlay
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
            overlay
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
        variant="light"
        overlay
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

    <ABtn
      :loading="loading"
      variant="fill"
    >
      Button
    </ABtn>
    <ABtn
      :loading="loading"
      variant="light"
    >
      Button
    </ABtn>
    <ABtn
      :loading="loading"
      variant="outline"
    >
      Button
    </ABtn>
    <ABtn
      :loading="loading"
      variant="text"
    >
      Button
    </ABtn>
    <ABtn
      variant="fill"
      :loading="loading"
      icon-only
      icon="i-bx-dollar-circle"
    />
    <ABtn
      variant="light"
      :loading="loading"
      icon-only
      icon="i-bx-dollar-circle"
    />
    <ABtn
      variant="outline"
      :loading="loading"
      icon-only
      icon="i-bx-dollar-circle"
    />
    <ABtn
      variant="text"
      :loading="loading"
      icon-only
      icon="i-bx-dollar-circle"
    />
  </div>
</template>
