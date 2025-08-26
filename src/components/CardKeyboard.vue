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
        <div class="w-fit p-2 rounded-t-2xl border-b-0 border-red-600 border-2 grow text-red-600 font-semibold"
          v-if="selectedPlayerId">{{ getPlayerById(selectedPlayerId).name }}
        </div>
        <div ref="playedCardsContainer"
          class="flex w-[300px] pt-4 min-h-[83px] flex-nowrap overflow-x-scroll bg-zinc-800">
          <Card class="shrink-0" @click="removeCard(card)" v-for="card in playedCards" :card-val="card" />
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
        <Card @click="addCard('1')" card-val="1" />
        <Card @click="addCard('2')" card-val="2" />
        <Card @click="addCard('3')" card-val="3" />
        <Card @click="addCard('4')" card-val="4" />
        <Card @click="addCard('5')" card-val="5" />
        <Card @click="addCard('6')" card-val="6" />
        <Card @click="addCard('7')" card-val="7" />
        <Card @click="addCard('8')" card-val="8" />
        <Card @click="addCard('9')" card-val="9" />
        <Card @click="addCard('10')" card-val="10" />
        <Card @click="addCard('11')" card-val="11" />
        <Card @click="addCard('12')" card-val="12" />
        <Card @click="addCard('0')" class="col-span-4" card-val="0" />
      </div>
      <div class="flex flex-col">
        <div class="grid grid-cols-3">
          <Card @click="addCard('+2')" card-val="+2" />
          <Card @click="addCard('+4')" card-val="+4" />
          <Card @click="addCard('+6')" card-val="+6" />
          <Card @click="addCard('+8')" card-val="+8" />
          <Card @click="addCard('+10')" card-val="+10" />
          <Card @click="addCard('x2')" card-val="x2" />
          <Card @click="addCard('F')" card-val="F" />
          <Card @click="addCard('D')" card-val="D" />
          <Card @click="addCard('SC')" card-val="SC" />
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