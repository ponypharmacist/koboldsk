import {
  // readLocalStorage,
  updateLocalStorage,
} from '@/helpers';

function defaultGrid() {
  const cols = Array(50).fill('0').join('');
  const rows = Array(30).fill(cols);
  return rows;
}

export default {
  namespaced: true,

  state: {
    mode: '0',
    village: {
      kobolds: [
        {
          name: 'Шкипа',
          sprite: 'a',
          x: 10,
          y: 10,
        },
      ],
      grid: [
        ...defaultGrid(),
      ],
    },

    rollQueue: [],
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
      if (state.mode === '0') return;

      const str = state.village.grid[y].substring(0, x) + state.mode + state.village.grid[y].substring(x + 1);
      state.village.grid[y] = str;

      state.village.grid.push('');
      state.village.grid.splice(state.village.grid.length - 1, 1);
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
  },
};
