<script setup>
import PointTable from './components/PointTable.vue';
import FullScreenOverlay from './components/FullScreenOverlay.vue';
import { ref } from 'vue';
import HostSettings from './components/HostSettings.vue';
import CardKeyboard from './components/CardKeyboard.vue';
import { useStore } from './stores/store';
import EndScreen from './components/EndScreen.vue';

const showSettings = ref(false);

const store = useStore();

</script>

<template>
  <header class="flex justify-between px-16 items-center">
    <h1 class="text-6xl">F</h1>
    <h1 class="text-xl">Sevener</h1>
    <button @click="showSettings = true">Info</button>
  </header>
  <FullScreenOverlay :is-visible="showSettings" @close="showSettings = false">
    <template v-slot:title>Settings</template>
    <HostSettings />
  </FullScreenOverlay>
  <main class="">
    <PointTable />
    <CardKeyboard />
    <FullScreenOverlay :is-visible="store.currentRound === 0" :is-closable="false">
      <EndScreen />
    </FullScreenOverlay>
  </main>
</template>