<script setup>
import { useMainStore } from '@/stores/mainStore';

const mainStore = useMainStore();

</script>

<template>
  <div class="border-black">
    <input type="text" name="UserName" id="UserName" v-model="mainStore.myId" placeholder="What's your name?">
  </div>
</template>