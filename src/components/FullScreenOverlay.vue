<script setup>
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['close']);

const close = () => {
  emits('close');
};
</script>

<template>
  <div v-if="isVisible" @click.self="close"
    class="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-1000">
    <div class="bg-white p-4 w-11/12 flex flex-col max-w-130 h-fit">
      <div class="flex justify-between items-center mb-4">
        <h2>Settings</h2>
         <button @click="close">&times;</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>