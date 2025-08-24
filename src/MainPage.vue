<script setup>
import PointTable from './components/PointTable.vue';
import FullScreenOverlay from './components/FullScreenOverlay.vue';
import { ref } from 'vue';
import HostSettings from './components/HostSettings.vue';
import CardKeyboard from './components/CardKeyboard.vue';

const showSettings = ref(false);

</script>

<template>
  <header class="flex justify-between px-16 items-center">
    <h1 class="text-6xl">F</h1>
    <h1 class="text-xl">Sevener</h1>
    <button @click="showSettings = true">Info</button>
  </header>
  <FullScreenOverlay :is-visible="showSettings" @close="showSettings = false">
    <HostSettings />
  </FullScreenOverlay>
  <main class="">
    <PointTable />
    <CardKeyboard />
  </main>
</template>