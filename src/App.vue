<script setup>
import LoginPage from './LoginPage.vue';
import MainPage from './MainPage.vue';

import { useMainStore } from './stores/mainStore';

const mainStore = useMainStore();

</script>

<template>
  <div>
    <LoginPage v-if="!mainStore.isLogged"/>
    <MainPage v-else/>
  </div>
</template>

<style scoped></style>
