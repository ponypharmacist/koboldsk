import {
  // readLocalStorage,
  updateLocalStorage,
} from '@/helpers';

const gridWidth = 50;
const gridHeight = 30;

function defaultGrid() {
  const cols = Array(gridWidth).fill('0').join('');
  const rows = Array(gridHeight).fill(cols);
  return rows;
}

function findRandomTileToMove({ grid, kobolds }, x, y) {
  const allowedTerrain = [
    '0',
    'g', 'G', 'C', 'r', 'R', 'B', // Grass 1-4, Road 1, 2, Dirt 1
  ];
  let directions = [];
  const koboldsCoords = kobolds.map((k) => `${k.x},${k.y}`);

  // top
  if (y > 0 && allowedTerrain.includes(grid[y - 1][x])) directions.push({ x, y: y - 1 });
  // top
  if (y < gridHeight - 1 && allowedTerrain.includes(grid[y + 1][x])) directions.push({ x, y: y + 1 });
  // right
  if (x < gridWidth - 1 && allowedTerrain.includes(grid[y][x + 1])) directions.push({ x: x + 1, y });
  // left
  if (x > 0 && allowedTerrain.includes(grid[y][x - 1])) directions.push({ x: x - 1, y });

  directions = directions.filter((d) => !koboldsCoords.includes(`${d.x},${d.y}`));

  if (!directions.length) return null;
  return directions[Math.floor(Math.random() * directions.length)];
}

export default {
  namespaced: true,

  state: {
    mode: '0',
    village: {
      grid: [
        ...defaultGrid(),
      ],
      kobolds: [
        {
          name: 'Шкипа',
          sprite: 'k01',
          x: 10,
          y: 10,
        },
        {
          name: 'Шуя',
          sprite: 'k03',
          x: 34,
          y: 8,
        },
        {
          name: 'Сукич',
          sprite: 'k02',
          x: 15,
          y: 19,
        },
        {
          name: 'Шани',
          sprite: 'k06',
          x: 30,
          y: 18,
        },
        {
          name: 'Шиша',
          sprite: 'k07',
          x: 22,
          y: 13,
        },
      ],
    },

    rollQueue: [],
    pause: false,
  },

  getters: {
  },

  mutations: {
    updateState(state, { param, value }) {
      state[param] = value;
    },

    updateRollQueue(state, payload) {
      const rollObject = {
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: payload.message,
        note: payload.note,
      };
      if (state.rollQueue.length >= 3) {
        state.rollQueue.shift();
      }
      state.rollQueue.push(rollObject);
    },

    removeFromQueue(state, index) {
      state.rollQueue.splice(index, 1);
    },

    populateGrid(state, { width, height }) {
      const cols = Array(width).fill('0');
      const rows = Array(height).fill(cols);
      state.village.grid = rows;
      // fill with 0 from position 2 until position 4
    },

    toggleMode(state, mode) {
      if (state.mode !== mode) state.mode = mode;
      else state.mode = '0';
    },

    // Placing items
    placeItem(state, { x, y }) {
      if (state.mode === '0') {
        console.log(`🧭 Coords: x:${x}, y:${y} `);
        return;
      }

      const str = state.village.grid[y].substring(0, x) + state.mode + state.village.grid[y].substring(x + 1);
      state.village.grid[y] = str;

      state.village.grid.push('');
      state.village.grid.splice(state.village.grid.length - 1, 1);
    },

    // Kobold movement
    moveKobold(state, { koboldIndex, x, y }) {
      state.village.kobolds[koboldIndex].x = x;
      state.village.kobolds[koboldIndex].y = y;
    },
  },

  actions: {
    onStartup({ commit }) {
      // const characters = readLocalStorage('localVillage');
      // commit('updateState', { param: 'mode', value: 'create' });

      commit('populateGrid', { width: 60, height: 40 });
    },

    saveVillage({
      state,
    }) {
      updateLocalStorage(state.village, 'localVillage');
    },

    // Placing items
    placeItem({ commit }, { x, y }) {
      commit('placeItem', { x, y });
    },

    // Animation
    animateKobolds({ state, commit }) {
      if (state.pause) return;
      // Pick random kobold
      const count = state.village.kobolds.length;
      const koboldIndex = Math.floor(Math.random() * count);
      const randomBoi = state.village.kobolds[koboldIndex];
      // Asses tiles in 4 directions
      const direction = findRandomTileToMove(state.village, randomBoi.x, randomBoi.y);
      if (!direction) return;
      // console.log(direction);
      commit('moveKobold', { koboldIndex, x: direction.x, y: direction.y });
    },
  },
};
