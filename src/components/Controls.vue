<template lang="pug">
  .controls-list
    .control-button(
      v-for="item in controlList"
      :key="item"
      :class="[item, { active: mode === item }]"
      @click="toggleMode(item)"
    )
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';

export default {
  name: 'controls',

  data: () => ({
    controlList: [
      '0', 'e', 'm', 'b', 't', 'T',
      'g', 'G', 'c', 'C', 'r', 'R', // Grass 1-4, Road 1-2
      'h', 'd', 'D', // House, tent, torch
      'a', 'A', // Box, bucket
      'B', 'i', 'I', // Dirt, Rock 1-2
      'E', 'f', 'F', 'H', // Mushroom, Potato 1-2, Log
    ],
  }),

  computed: {
    ...mapState('main', [
      'mode',
    ]),

  },

  methods: {
    ...mapMutations('main', [
      'toggleMode',
    ]),
  },
};
</script>

<style lang="sass" scoped>
$yellow: #ecbe57

.controls-list
  display: flex
  flex-wrap: wrap

.control-button
  position: relative
  width: 20px
  height: 20px
  margin: 0 0 4px 4px
  border: 1px solid transparent
  border-radius: 1px
  cursor: pointer

  &:hover,
  &.active
    border-color: $yellow
</style>
