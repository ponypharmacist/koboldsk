import {
  // readLocalStorage,
  updateLocalStorage,
} from '@/helpers';

export default {
  namespaced: true,

  state: {
    mode: null,
    village: {
      grid: [],
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
      const cols = Array(width).fill({ active: true });
      const rows = Array(height).fill(cols);
      console.log(rows);
      state.village.grid = rows;
      // fill with 0 from position 2 until position 4
    },
  },

  actions: {
    onStartup({ commit }) {
      // const characters = readLocalStorage('localVillage');
      // commit('updateState', { param: 'mode', value: 'create' });

      commit('populateGrid', { width: 65, height: 40 });
    },

    saveVillage({
      state,
    }) {
      updateLocalStorage(state.village, 'localVillage');
    },
  },
};
