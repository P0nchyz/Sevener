import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';

export const useStore = defineStore('store', () => {
  // Personal
  const isLogged = ref(false);
  const role = ref(''); // 'host' || 'guest'
  const myId = ref('');
  const myName = ref('');
  const myUser = computed(
    () => users.value.find((u) => u.id === myId.value) || null
  );

  const targetScore = ref(200);

  const currentRound = ref(0);
  const users = ref([]);
  const players = computed(() => users.value.flatMap((user) => user.players));

  function addUser(userId, userName) {
    const newUser = {
      id: userId,
      name: userName,
      players: [],
    };

    users.value.push(newUser);
    addPlayer(userId, userName, userId);
  }

  function renameUser(userId, newName) {
    const user = users.value.find((u) => u.id === userId);
    if (!user) return;
    user.name = newName;
    renamePlayer(userId, newName);
  }

  // Player funcs
  function addPlayer(userId, playerName, playerId) {
    const user = users.value.find((u) => u.id === userId);
    if (!user) return;
    user.players.push({
      id: playerId,
      name: playerName,
      scores: [],
    });
  }

  function renamePlayer(playerId, newName) {
    for (const user of users.value) {
      const player = user.players.find((p) => p.id === playerId);
      if (player) {
        player.name = newName;
        break;
      }
    }
  }

  function newRoom() {
    if (myName.value === '') {
      alert('Please write your name');
      return;
    }
    role.value = 'host';
    myId.value = generateId();
    addUser(myId.value, myName.value);
    currentRound.value = 1;
    isLogged.value = true;
  }

  const selectedPlayerId = ref('');

  function selectPlayer(playerId) {
    if (myUser.value.players.some((player) => player.id === playerId)) {
      selectedPlayerId.value = playerId;
    }
  }

  function getPlayerById(playerId) {
    const player = players.value.find((p) => p.id === playerId);
    return player;
  }

  function setPlayerScore(playerId, round, score) {
    const player = getPlayerById(playerId);
    player.scores[round - 1] = score;

    checkIfRoundComplete();
  }

  function checkIfRoundComplete() {
    const round = currentRound.value - 1;
    const allPlayersHaveScores = players.value.every(
      (player) =>
        player.scores[round] !== undefined &&
        player.scores[round] !== null &&
        player.scores[round] !== ''
    );

    if (allPlayersHaveScores) {
      completeRound();
    }
  }

  function completeRound() {
    if (getWinners().length !== 0) {
      currentRound.value = 0;
      return;
    }

    currentRound.value++;
  }

  function getWinners() {
    const playersWithTotals = players.value.map((player) => ({
      ...player,
      total: player.scores.reduce((acc, cur) => acc + cur, 0),
    }));

    const aboveTargetScore = playersWithTotals.filter(
      (player) => player.total >= targetScore.value
    );

    if (aboveTargetScore.length === 0) return [];

    const highestScore = Math.max(...aboveTargetScore.map((p) => p.total));

    return aboveTargetScore.filter((player) => player.total === highestScore);
  }

  function resetGame() {
    players.value.forEach((player) => {
      player.scores = [];
    });
    currentRound.value = 1;
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 10);
  }

  return {
    isLogged,
    role,
    myId,
    myName,
    myUser,
    users,
    addUser,
    renameUser,
    currentRound,
    players,
    addPlayer,
    renamePlayer,
    newRoom,
    selectedPlayerId,
    selectPlayer,
    getPlayerById,
    setPlayerScore,
    getWinners,
    resetGame,
    generateId,
  };
});
