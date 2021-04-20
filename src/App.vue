<template>
  <div id="app">
    <button class="test-button" @click="updateCamera">ZoomIn</button>
    <Scene />
    <UI />
  </div>
</template>

<script>
/* eslint-disable */ 
import Scene from "./components/Scene";
import UI from "./components/UI";

export default {
  name: "App",
  components: {
    Scene,
    UI
  },
  methods: {
    updateCamera() {
      this.$store.commit("updateCamera", {posX: 0.5, posY: -1, posZ: 1.25});
    },
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}

.test-button {
  position: absolute;
  top: 24px;
  left: 24px;
}
</style>
