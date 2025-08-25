<script setup>
import { useStore } from '@/stores/store';


const store = useStore();

const { getWinners, resetGame } = store;

const winners = getWinners();
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <h1 class="text-2xl font-bold">End Game</h1>
    <nav v-for="player in winners">
      <p class="text-xl m-4">{{ player.name }}</p>
    </nav>
    <nav class="mb-8">won!</nav>
    <button @click="resetGame" class="p-2 border-2 border-green-700 text-green-700 rounded-md">Play Again</button>
  </div>
</template>