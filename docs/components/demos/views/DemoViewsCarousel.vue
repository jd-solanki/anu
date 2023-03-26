<script lang="ts" setup>
import { useCycleList } from '@vueuse/core'
import { nextTick, ref } from 'vue'

const { state, next, prev } = useCycleList(['first', 'second', 'third'], {
  initialValue: 'second',
})

const transition = ref('view-next')

const handleNext = () => {
  transition.value = 'view-next'
  nextTick(next)
}

const handlePrev = () => {
  transition.value = 'view-previous'
  nextTick(prev)
}
</script>

<template>
  <AViews
    v-model="state"
    :transition="transition"
    class="rounded-lg"
  >
    <AView value="first">
      <ACard
        title="First Card"
        class="shadow-none"
        text="Bear claw sweet dessert sweet chocolate bar sesame snaps shortbread."
      />
    </AView>
    <AView value="second">
      <ACard
        title="Second Card"
        class="shadow-none"
        text="Lollipop marzipan cotton candy pie macaroon wafer jelly beans shortbread."
      />
    </AView>
    <AView value="third">
      <ACard
        title="Third Card"
        class="shadow-none"
        text="Pastry biscuit tart I love gummies wafer oat cake."
      />
    </AView>
  </AViews>
  <div class="flex justify-between items-center mt-6 text-sm">
    <ABtn
      icon="i-bx-left-arrow-alt"
      variant="text"
      @click="handlePrev"
    >
      Previous
    </ABtn>
    <ABtn
      append-icon="i-bx-right-arrow-alt"
      variant="text"
      @click="handleNext"
    >
      Next
    </ABtn>
  </div>
</template>
