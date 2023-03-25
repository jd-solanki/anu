<script lang="ts" setup>
const tabs = [
  { title: 'Account', icon: 'i-bx-user' },
  { title: 'Notifications', icon: 'i-bx-bell' },
  { title: 'Settings', icon: 'i-bx-cog' },
]
</script>

<template>
  <div class="cards-demo-container container mx-auto mt-16">
    <ATabs
      class="a-tabs-bordered [&_.a-tabs-wrapper]-mb-6 [&_.a-tabs-content]--m-8 [&_.a-views]-p-8"
      :tabs="tabs"
    >
      <template #0>
        <div>
          <ACard
            title="Card Title"
            subtitle="This is subtitle"
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est sed minima, sit mollitia corporis animi!"
            class="shadow-xl"
          />
        </div>
      </template>
    </ATabs>
  </div>
</template>
