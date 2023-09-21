<template>
  <div class="container">
    <div class="logo">
      <img src="/images/logo.svg" alt="Logo">
    </div>
    <TicketsPicker />
  </div>
</template>

<script setup>

import TicketsPicker from './components/TicketsPicker.vue';

</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 50px 0;
  
  img {
    box-shadow: 0px 1px 11px rgba(55, 104, 142, 0.30);
    border-radius: 50%;
  }
}
</style>