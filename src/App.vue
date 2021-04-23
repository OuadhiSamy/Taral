<template>
  <div id="app">
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
@font-face {
  font-family: "Elgoc";
  src: local("Elgoc"),
   url(./assets/fonts/Elgoc-Bold.ttf) format("truetype");
}

@font-face {
  font-family: "FH Cordelia";
  src: local("FH Cordelia"),
   url(./assets/fonts/FHCordelia-Regular.otf) format("truetype");
}

@font-face {
  font-family: "Gilroy";
  src: local("Gilroy"),
   url(./assets/fonts/Gilroy-ExtraBold.otf) format("truetype");
}

@font-face {
  font-family: "Kate";
  src: local("Kate"),
   url(./assets/fonts/Kate-Display.otf) format("truetype");
}

@font-face {
  font-family: "Lydia";
  src: local("Lydia"),
   url(./assets/fonts/LydiaCondensed-Bold.ttf) format("truetype");
}

@import "./styles/style.scss";

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
