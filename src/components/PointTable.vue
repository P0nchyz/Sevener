<script setup>
import { useStore } from '@/stores/store';
import { storeToRefs } from 'pinia';
import { ref, nextTick, watch, computed } from 'vue';

const store = useStore();

const { selectPlayer } = store;

const { sortedPlayers, selectedPlayerId, currentRound } = storeToRefs(store);


const scrollContainer = ref(null);

watch(currentRound, () => {
  nextTick(() => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTo({
        left: scrollContainer.value.scrollWidth,
        behavior: "smooth",
      });
    }
  })
})
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
          <tr v-for="player in sortedPlayers" @click="selectPlayer(player.id)">
            <td class="p-2" :class="(player.id === selectedPlayerId) ? 'bg-gray-300' : ''">{{ player.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div ref="scrollContainer" class="mx-8 overflow-x-auto">
      <table>
        <thead>
          <tr>
            <th v-for="i in currentRound" class="p-2">{{ i }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in sortedPlayers">
            <td v-for="i in store.currentRound" class="p-2">{{ player.scores[i - 1] !== 0 ? (player.scores[i - 1] ||
              '...') : '0' }}</td>
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
          <tr v-for="player in sortedPlayers">
            <td class="p-2">{{player.scores.reduce((acc, cur) => acc + cur, 0)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>