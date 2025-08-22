import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

import bluePfp from '@/assets/userPictures/blue.png';

export const useMainStore = defineStore('mainStore', () => {
  const isLogged = ref(true);

  const users = reactive([
    {
      id: '',
      name: 'User1',
      players: [
        { id: '101', name: 'Emily', scores: [46, 27, 42, 45] },
        { id: '102', name: 'John', scores: [18, 45, 39, 36] },
      ],
    },
    {
      id: '',
      name: 'User2',
      players: [
        { id: '201', name: 'Sue', scores: [30, 42, 39] },
        { id: '202', name: 'Marcus', scores: [15, 12, 48] },
      ],
    },
  ]);
  const currentRound = ref(8);
  const role = ref(''); // 'host' || 'guest'
  const myId = ref('');
  const players = computed(() => users.flatMap((user) => user.players));

  // Player funcs
  function addPlayer(userId, playerName) {
    const user = users.find((u) => u.id === userId);
    if (!user)
      return user.players.push({
        id: user.id + '0' + user.players.length,
        name: playerName,
        scores: [],
      });
  }

  return {
    isLogged,
    currentRound,
    role,
    myId,
    players,
  };
});
