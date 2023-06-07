<script lang="ts" setup>
const tabs = [
  {
    title: 'Account',
    value: 'account',
    icon: 'i-bx-user',
  },
  {
    title: 'Notifications',
    value: 'notifications',
    icon: 'i-bx-bell',
  },
  {
    title: 'Settings',
    value: 'settings',
    icon: 'i-bx-cog',
  },
]
</script>

<template>
  <div class="cards-demo-container">
    <ACard>
      <ATabs
        class="a-tabs-bordered"
        :tabs="tabs"
      >
        <!-- 👉 Account -->
        <template #account>
          <div class="a-card-body">
            Bear claw sweet dessert sweet chocolate bar sesame snaps shortbread.
          </div>
        </template>

        <!-- 👉 Notifications -->
        <template #notifications>
          <div class="a-card-body">
            Lollipop marzipan cotton candy pie macaroon wafer jelly beans shortbread.
          </div>
        </template>

        <!-- 👉 Settings -->
        <template #settings>
          <div class="a-card-body">
            Pastry biscuit tart I love gummies wafer oat cake.
          </div>
        </template>
      </ATabs>
    </ACard>
  </div>
</template>
