<script setup>
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';

const store = useStore();

const { selectPlayer } = store;

const { players, selectedPlayerId } = storeToRefs(store);
</script>

<template>
  <div class="flex justify-center mx-8">
    <div class="shrink-0">
      <table>
        <thead>
          <tr>
            <th class="p-2">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players" @click="selectPlayer(player.id)">
            <td class="p-2" :class="(player.id === selectedPlayerId) ? 'bg-red-500' : ''">{{ player.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mx-8 overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th v-for="i in store.currentRound" class="p-2">{{ i }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players">
            <td v-for="score in player.scores" class="p-2">{{ score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="shrink-0">
      <table>
        <thead>
          <tr>
            <th class="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in players">
            <td class="p-2">{{player.scores.reduce((acc, cur) => acc + cur, 0)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>