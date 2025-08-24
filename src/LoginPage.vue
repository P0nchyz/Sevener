<script setup>
import NewRoom from './components/NewRoom.vue';
import UserDataSettings from './components/UserDataSettings.vue';
import { useStore } from './stores/store';

const store = useStore();

</script>

<template>
  <header class="flex flex-col items-center">
    <h1 class="text-6xl">F</h1>
    <h1 class="text-xl">Sevener</h1>
  </header>
  <main class="flex flex-col items-center mt-20">
    <UserDataSettings />
    <NewRoom/>
  </main>
</template>