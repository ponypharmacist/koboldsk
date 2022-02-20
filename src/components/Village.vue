<template lang="pug">
  .village-grid
    .village-row(
      v-for="(row, y) in village.grid"
    )
      .village-cell(
        v-for="(cell, x) in row"
      )
</template>

<script>
import {
  mapActions,
  mapState,
} from 'vuex';

export default {
  name: 'village',

  data: () => ({ }),

  computed: {
    ...mapState('main', [
      'village',
    ]),
  },

  methods: {
    ...mapActions('main', ['onStartup']),
  },
};
</script>

<style lang="sass" scoped>
$yellow: #ecbe57
$green: #4dde14

// Grid
.village-row
  display: flex

.village-cell
  flex: 0 0 auto
  width: 16px
  height: 16px
  margin: 1px
  border-radius: 2px
  background-color: rgba(255, 255, 255, 0.1)

  &:hover
    background-color: rgba(255, 255, 255, 0.2)
</style>
