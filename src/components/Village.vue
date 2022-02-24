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

  mounted() {
    this.myFunction();
  },

  methods: {
    ...mapActions('main', [
      'onStartup',
      'placeItem',
      'animateKobolds',
    ]),

    koboldStyle(x, y) {
      return {
        left: `${x * 16}px`,
        top: `${y * 16}px`,
      };
    },

    myFunction() {
      this.animateKobolds();
      // Movement interval in seconds
      const min = 2;
      const max = 4;
      const rand = Math.floor(Math.random() * (max - min + 1) + min); // Generate Random number
      setTimeout(this.myFunction, rand * 1000);
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
  border-radius: 2px

  &:hover
    background-color: rgba(255, 255, 255, 0.2)

.kobold
  position: absolute
  z-index: 1
  width: 16px
  height: 16px
  transition: all 0.5s ease
</style>
