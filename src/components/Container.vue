<template lang="pug">
  .container-wrap
    .container-controls.golden-border
      controls

    .container-grid.golden-border
      village

    .roll-queue
      .queue-item(
        v-for="(roll, index) in rollQueue"
        @click="removeFromQueue(index)"
      )
        span.roll-date {{ roll.date }}
        span.roll-string {{ roll.message }}
        span.roll-note {{ roll.note }}
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';
// import {
//   clearLocalStorage,
// } from '../helpers';

import Controls from './Controls.vue';
import Village from './Village.vue';

export default {
  name: 'container',

  components: {
    Controls,
    Village,
  },

  mounted() {
    // clearLocalStorage('localVillage');
  },

  computed: {
    ...mapState('main', [
      'mode',
      'rollQueue',
    ]),

  },

  methods: {
    ...mapMutations('main', [
      'updateRollQueue',
      'removeFromQueue',
    ]),
  },
};
</script>

<style lang="sass" scoped>
.container-wrap
  display: flex
  width: calc(832px + 24px + 240px)
  margin: 32px auto 0

.container-grid
  width: calc(832px)
  background-color: #1a1f1b

.container-controls
  width: 240px
  margin-right: 24px

// Roll log window
.roll-queue
  position: fixed
  text-align: left
  z-index: 10
  width: calc(100% - 24px)
  right: 12px
  bottom: 4px
  color: #000

.queue-item
  display: flex
  align-items: center
  flex-wrap: wrap
  background-color: rgba(255,255,255,1)
  padding: 3px 8px 3px
  margin: 4px 0
  border-radius: 2px
  // font-family: 'Open Sans', Arial, sans-serif
  cursor: default

.roll-date
  color: #999
  font-size: 12px
  padding-right: 6px
  padding-top: 1px
  white-space: nowrap

.roll-string
  font-size: 14px

.roll-note
  font-weight: bold
  padding-left: 4px

</style>
