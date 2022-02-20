<template>
  <div id="app">
    <container/>
  </div>
</template>

<script>
import {
  mapActions,
} from 'vuex';

import Container from './components/Container.vue';

export default {
  name: 'App',

  components: {
    Container,
  },

  mounted() {
    this.onStartup();
  },

  methods: {
    ...mapActions('main', [
      'onStartup',
    ]),
  },
};
</script>

<style lang="sass" scoped>
</style>
