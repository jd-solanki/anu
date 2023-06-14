<template>
  <ABtn class="me-4">
    Button
  </ABtn>
  <AConfig :props="{ ABtn: { variant: 'light' } }">
    <ABtn>Configured Button</ABtn>
  </AConfig>
</template>
