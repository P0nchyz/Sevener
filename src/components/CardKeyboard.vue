<script setup>
import { useStore } from '@/stores/store';
import Card from './Card.vue';
import { storeToRefs } from 'pinia';
import { computed, nextTick, ref } from 'vue';

const store = useStore();

const { getPlayerById, setPlayerScore } = store;

const { selectedPlayerId, currentRound } = storeToRefs(store);

const playedCards = ref([]);

const playedCardsContainer = ref(null);

const addCard = (cardVal) => {
  if (playedCards.value.includes(cardVal)) return;
  playedCards.value.push(cardVal);

  nextTick(() => {
    if (playedCardsContainer.value) {
      playedCardsContainer.value.scrollTo({
        left: playedCardsContainer.value.scrollWidth,
        behavior: "smooth",
      });
    }
  })
}

const removeCard = (cardVal) => {
  playedCards.value = playedCards.value.filter(n => n !== cardVal);
}

const isNumberCard = (cardVal) => {
  return /^(0|[1-9]|1[0-2])$/.test(cardVal);
}

const calculateScore = () => {
  let score = 0;
  const numberCards = playedCards.value.filter(isNumberCard);
  let modifierCards = playedCards.value.filter(c => !isNumberCard(c));
  score += numberCards.reduce((acc, val) => acc + Number(val), 0);
  if (modifierCards.includes('x2')) {
    score *= 2;
    modifierCards = modifierCards.filter(c => c !== 'x2');
  }
  score += modifierCards.reduce((acc, val) => acc + (Number(val) || 0), 0);
  if (numberCards.length >= 7) score += 15;
  return score;
}

const roundScore = computed(calculateScore);

</script>

<template>
  <div v-if="selectedPlayerId" class="absolute bottom-0 translate-x-[-50%] left-1/2 w-max  text-white">
    <div class="flex justify-baseline">
      <div class="flex flex-col justify-end">
        <div class="w-fit p-2 rounded-t-2xl border-b-0 border-red-600 border-2 grow text-red-600 font-semibold" v-if="selectedPlayerId">{{ getPlayerById(selectedPlayerId).name }}
        </div>
        <div ref="playedCardsContainer"
          class="flex w-[300px] pt-4 min-h-[83px] flex-nowrap overflow-x-scroll bg-zinc-800">
          <Card class="shrink-0" @click="removeCard(card)" v-for="card in playedCards">{{ card }}</Card>
        </div>
      </div>
      <div class="grow px-4 bg-zinc-800 rounded-t-2xl">
        <div class="pt-2">
          <nav class="inline-block text-sm text-gray-400 mr-1">Round</nav>
          <nav class="inline-block text-xl">{{ store.currentRound }}</nav>
        </div>
        <div class="h-[83px] pt-4">
          <span class="text-xl">{{ roundScore }}</span>
          <span class="text-sm text-gray-400 ml-1">Points</span>
        </div>
      </div>
    </div>
    <div class="flex justify-around gap-8 p-4 bg-zinc-800">
      <div class="grid grid-cols-4 justify-items-center">
        <Card @click="addCard('1')">1</Card>
        <Card @click="addCard('2')">2</Card>
        <Card @click="addCard('3')">3</Card>
        <Card @click="addCard('4')">4</Card>
        <Card @click="addCard('5')">5</Card>
        <Card @click="addCard('6')">6</Card>
        <Card @click="addCard('7')">7</Card>
        <Card @click="addCard('8')">8</Card>
        <Card @click="addCard('9')">9</Card>
        <Card @click="addCard('10')">10</Card>
        <Card @click="addCard('11')">11</Card>
        <Card @click="addCard('12')">12</Card>
        <Card @click="addCard('0')" class="col-span-4">0</Card>
      </div>
      <div class="flex flex-col">
        <div class="grid grid-cols-3">
          <Card @click="addCard('+2')">+2</Card>
          <Card @click="addCard('+4')">+4</Card>
          <Card @click="addCard('+6')">+6</Card>
          <Card @click="addCard('+8')">+8</Card>
          <Card @click="addCard('+10')">+10</Card>
          <Card @click="addCard('x2')">x2</Card>
          <Card @click="addCard('F')">F</Card>
          <Card @click="addCard('D')">D</Card>
          <Card @click="addCard('SC')">SC</Card>
        </div>
        <div>
          <button @click="playedCards.length = 0"
            class="p-2 m-2 border-1 border-red-600 text-red-600 rounded-md">CLEAR</button>
          <button @click="setPlayerScore(selectedPlayerId, currentRound, roundScore); playedCards.length = 0"
            class="p-2 m-2 border-1 border-green-600 text-green-600 rounded-md">GO</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (pointer: fine) {

  *::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>