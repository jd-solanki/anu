<script lang="ts" setup>
const data = [
  {
    title: 'Total Balance',
    amount: 87500,
    differenceInPercentage: 3.6
  },
  {
    title: 'Income',
    amount: 28470,
    differenceInPercentage: 12.3
  },
  {
    title: 'Outcome',
    amount: 21560,
    differenceInPercentage: -3.6
  },
]
</script>

<template>
  <div class="analytics-wrapper grid-row grid-cols-3 @container children-col-span-3 children-@[635px]:col-span-1 place-items-stretch">
    <ACard v-for="item in data" :key="item.title">
      <div class="a-card-body">

        <!-- Title -->
        <h3 class="a-subtitle mb-3 font-semibold">{{ item.title }}</h3>

        <!-- Amount -->
        <h4 class="a-title text-4xl mb-4 font-semibold">${{ item.amount / 1000 }}k</h4>

        <!-- Footer - Difference -->
        <p class="flex items-center gap-x-2">
          <AAvatar
            :color="item.differenceInPercentage >= 0 ? 'success' : 'danger'"
            variant="fill"
            class="text-xl spacing-70"
            :icon="item.differenceInPercentage >= 0 ? 'i-bx-up-arrow-alt' : 'i-bx-down-arrow-alt'"
          />
          <span class="whitespace-nowrap text-sm">{{ Math.abs(item.differenceInPercentage) }}% this month</span>
        </p>
      </div>
    </ACard>
  </div>
</template>

<!-- Credits: https://dribbble.com/shots/19744173-BalanceFlow-Interface-elements-design -->
