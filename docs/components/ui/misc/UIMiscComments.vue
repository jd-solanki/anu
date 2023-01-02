<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')

const comments = [
  {
    avatar: 'https://i.pravatar.cc/150?img=47',
    name: 'Sarah Floyd',
    comment: 'Have you guys thought about seeing a movie? There\'s a new action flick playing at the theater down the street.',
    time: '2 hours ago',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=56',
    name: 'Ollie Bradley',
    comment: 'Ooh, that sounds like fun 😍',
    time: '90 minutes ago',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=45',
    name: 'Jane Jennings',
    comment: 'Sounds like a plan. Let\'s make it happen.',
    time: '1 hour ago',
  },
  {
    avatar: 'https://i.pravatar.cc/150?img=31',
    name: 'Olivia McDaniel',
    comment: 'Awesome, I\'ll buy the tickets. See you guys at the theater in a bit..',
    time: '15 minutes ago',
  },
]
</script>

<template>
  <div class="cards-demo-container max-w-550px">
    <ACard title="Comments">
      <!-- 👉 Card body -->
      <div class="a-card-body a-card-spacer">
        <!-- 👉 Comments Loop -->
        <div
          v-for="(comment, index) in comments"
          :key="index"
          class="!mb-5"
        >
          <!-- Header: Avatar & Name -->
          <div class="flex gap-2 mb-2 items-center">
            <AAvatar
              class="text-base"
              :src="comment.avatar"
            />
            <ATypography :title="[comment.name, 'text-base']" />
          </div>

          <!-- Comment -->
          <p class="text-sm">
            {{ comment.comment }}
          </p>

          <!-- Comment time -->
          <ATypography
            class="text-xs mt-1"
            :subtitle="comment.time"
          />
        </div>

        <ATextarea v-model="input" />

        <ABtn
          class="justify-self-start"
          @click="input = ''"
        >
          Comment
        </ABtn>
      </div>
    </ACard>
  </div>
</template>
