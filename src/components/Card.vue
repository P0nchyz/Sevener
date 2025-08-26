<script setup>
const props = defineProps(['cardVal'])

const getColor = () => {
  switch (props.cardVal) {
    case '1':
      return 'text-stone-400'
    case '2':
      return 'text-yellow-300'
    case '3':
      return 'text-rose-500'
    case '4':
      return 'text-cyan-500'
    case '5':
      return 'text-lime-700'
    case '6':
      return 'text-fuchsia-700'
    case '7':
      return 'text-red-400'
    case '8':
      return 'text-green-300'
    case '9':
      return 'text-amber-600'
    case '10':
      return 'text-red-600'
    case '11':
      return 'text-blue-400'
    case '12':
      return 'text-stone-700'
    case '+2':
      return 'text-amber-800 bg-yellow-600'
    case '+4':
      return 'text-amber-800 bg-yellow-600'
    case '+6':
      return 'text-amber-800 bg-yellow-600'
    case '+8':
      return 'text-amber-800 bg-yellow-600'
    case '+10':
      return 'text-amber-800 bg-yellow-600'
    case 'x2':
      return 'text-amber-800 bg-yellow-600'
    case 'F':
      return 'text-stone-400 bg-sky-400'
    case 'SC':
      return 'text-stone-400 bg-red-600'
    case 'D':
      return 'text-stone-400 bg-yellow-400'
    default:
      break;
  }
}
</script>

<template>
  <button class="bg-orange-200 font-bold border-1 text-center m-2 rounded-sm w-8 h-12 " :class="getColor()">
    {{ cardVal }}
  </button>
</template>

<style lang="css" scoped>
button {
  text-shadow: 
  1px 1px 0 black,
  -1px 1px 0 black,
  1px -1px 0 black,
  -1px -1px 0 black;
}
</style>