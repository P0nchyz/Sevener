<script setup>
import { useStore } from '@/stores/store';


const store = useStore();

const { getWinners, resetGame, sortedPlayers } = store;

const winners = getWinners();
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <h1 class="text-2xl font-bold">Game Over</h1>
    <span v-for="player in winners">
      <p class="text-xl m-4">{{ player.name }}</p>
    </span>
    <span class="mb-4">won!</span>
    <div class="flex flex-col mb-8">
      <span v-for="(player, i) in sortedPlayers">
        <span v-if="i == 0">🥇</span>
        <span v-else-if="i == 1">🥈</span>
        <span v-else-if="i == 2">🥉</span>
        <span v-else>{{ i + 1 }} - </span>
        <span>{{ player.name }} - </span>
        <span>{{ player.total }}</span>
      </span>
    </div>
    <button @click="resetGame" class="p-2 border-2 border-green-700 text-green-700 rounded-md">Play Again</button>
  </div>
</template>