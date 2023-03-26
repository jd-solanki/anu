<script lang="ts" setup>
import { ref } from 'vue'

const activeView = ref('first')
</script>

<template>
  <div class="flex gap-4 my-6">
    <ARadio
      v-model="activeView"
      name="first"
      value="first"
      label="First"
    />
    <ARadio
      v-model="activeView"
      name="second"
      value="second"
      label="Second"
    />
    <ARadio
      v-model="activeView"
      name="third"
      value="third"
      label="Third"
    />
  </div>

  <AViews
    v-model="activeView"
    class="[--fade-opacity-duration:.35s] p-8 -m-8"
  >
    <AView value="first">
      <ACard
        title="First Card"
        text="Bear claw sweet dessert sweet chocolate bar sesame snaps shortbread."
      />
    </AView>
    <AView value="second">
      <ACard
        title="Second Card"
        text="Lollipop marzipan cotton candy pie macaroon wafer jelly beans shortbread."
      />
    </AView>
    <AView value="third">
      <ACard
        title="Third Card"
        text="Pastry biscuit tart I love gummies wafer oat cake."
      />
    </AView>
  </AViews>
</template>
