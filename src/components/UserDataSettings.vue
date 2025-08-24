<script setup>
import { useStore } from '@/stores/store';

const store = useStore();

</script>

<template>
  <div class="border-black border-2 rounded-md p-8">
    <input type="text" name="UserName" id="UserName" v-model="store.myName" placeholder="What's your name?"
      class="p-2">
  </div>
</template>