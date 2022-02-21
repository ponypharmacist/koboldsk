<template lang="pug">
  .village-grid
    .kobold(
      v-for="(kobold, index) in village.kobolds"
      :key="`kobo:${index}`"
      :class="kobold.sprite"
      :style="koboldStyle(kobold.x, kobold.y)"
      :title="kobold.name"
    )

    .village-row(
      v-for="(row, y) in village.grid"
      :key="`row:${y}`"
    )
      .village-cell(
        v-for="(cell, x) in row"
        :key="`c:${x},${y}`"
        :class="cell"
        @click="placeItem({ x, y })"
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
    ...mapActions('main', [
      'onStartup',
      'placeItem',
    ]),

    koboldStyle(x, y) {
      return {
        left: `${x * 18 + 1}px`,
        top: `${y * 18 + 1}px`,
      };
    },
  },
};
</script>

<style lang="sass" scoped>
$yellow: #ecbe57
$green: #4dde14

// Grid
.village-grid
  position: relative

.village-row
  display: flex

.village-cell
  flex: 0 0 auto
  width: 16px
  height: 16px
  margin: 1px
  border-radius: 2px
  background-color: rgba(255, 255, 255, 0.05)

  &:hover
    background-color: rgba(255, 255, 255, 0.2)

.kobold
  position: absolute
  z-index: 1
  width: 16px
  height: 16px
</style>
