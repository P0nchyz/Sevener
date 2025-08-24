<script setup>
import LoginPage from './LoginPage.vue';
import MainPage from './MainPage.vue';

import { useStore } from './stores/store';

const store = useStore();

</script>

<template>
  <div>
    <LoginPage v-if="!store.isLogged" />
    <MainPage v-else />
  </div>
</template>

<style scoped></style>
