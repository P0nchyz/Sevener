<script setup>
import { useStore } from '@/stores/store';

const store = useStore();

const { newRoom } = store;
</script>

<template>
  <div>
    <button @click="newRoom" class="border-2 border-green-600 text-green-600 p-2 m-2">NEW ROOM</button>
  </div>
</template>