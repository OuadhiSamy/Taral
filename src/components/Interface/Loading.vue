<template>
  <div class="loading">
    <div class="loading__wrapper">
      <div class="loading__value">{{ Math.round(loadPercent * 100) }}</div>
      <div class="loading__progress" :style="{transform: `scaleX(${loadPercent})`}"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Loading",
  computed: mapState({
    loadPercent: "loadPercent",
  }),
  methods: {},
};
</script>

<style lang="scss">
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: $black;

  z-index: 10;

  &__wrapper {
    width: 300px;
  }

  &__value {
    font-size: 86px;
    margin-bottom: 40px;
    text-align: center;
    color: $white;
  }

  &__progress {
    width: 100%;
    height: 2px;
    background-color: $white;
    transform-origin: left;
    transform: scaleX(0);
    transition: 200ms;
    
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>