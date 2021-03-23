<template>
  <div id="app">
    <Scene />
  </div>
</template>

<script>
import Scene from "./components/Scene"

export default {
  name: "App",
  components: {
    Scene
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
</style>
