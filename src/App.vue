<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <div class="md:flex h-screen">
    <div class="h-64 md:h-auto bg-cover bg-center md:w-1/3 bg-app"></div>
    <div class="md:w-2/3 px-10 py-5 min-h-full overflow-y-scroll">
      <RouterView />
    </div>
  </div>

</template>

<style scoped>
  .bg-app{
    background-image: url('/img/1.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
