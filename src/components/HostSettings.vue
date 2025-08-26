<script setup>
import { useStore } from '@/stores/store';
import UserDataSettings from './UserDataSettings.vue';
import { storeToRefs } from 'pinia';
import { ref, nextTick } from 'vue';

const store = useStore();

const { myId, addPlayer, generateId, removePlayer } = store;

const { players } = storeToRefs(store);

const inputRefs = ref({});

const handleAddPlayer = () => {
  const userId = generateId();
  addPlayer(myId, 'NewPlayer', userId);

  nextTick(() => {
    const input = inputRefs.value[userId];
    if (input) input.focus();
  })
}
</script>

<template>
  <div class="flex flex-col">
    <UserDataSettings />
    <div class="my-8">
      <div class="flex justify-evenly">
        <div class="border-2 border-black p-2 rounded-md flex flex-col w-1/2">
          <span v-for="player in players" :key="player.id" class="flex justify-between">
            <input type="text" name="" id="" v-model="player.name" :ref="el => inputRefs[player.id] = el"
              class="fit-cont">
            <button @click="removePlayer(player.id)" class="text-red-500">x</button>
          </span>
        </div>
        <div class="flex flex-col">
          <button @click="handleAddPlayer" class=" my-2 p-2 border-2 border-black rounded-md">Add
            Player</button>
          <button class="my-2 p-2 border-2 border-black rounded-md">QR</button>
          <p>Room Code</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
input {
  field-sizing: content;
}
</style>