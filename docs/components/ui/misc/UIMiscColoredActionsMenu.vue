<script lang="ts" setup>
const items = [
  {
    icon: 'i-bx-send',
    text: 'Send',
  },
  {
    icon: 'i-bx-edit',
    text: 'Edit',
  },
  {
    icon: 'i-bx-trash',
    text: 'Delete',
    color: 'danger', // [!code hl]
  },
]
</script>

<template>
  <div class="max-w-550px">
    <ABtn
      icon="i-bx-file"
      append-icon="i-bx-chevron-down"
    >
      Invoice
      <AMenu>
        <!-- ℹ️ `model-value="null"` will be all list items clickable -->
        <AList
          :model-value="null"
          :items="items"
        />
      </AMenu>
    </ABtn>
  </div>
</template>
