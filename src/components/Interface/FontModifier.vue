<template>
  <div class="font-modifier">
    <input
      class="font-modifier__slider"
      type="range"
      name="numberSize"
      id=""
      v-model="nbFontSize"
      min="0"
      max="2"
      step="0.01"
      @input="$store.commit('updateFontSize', nbFontSize)"
    />
    {{ nbFontSize }}
  </div>
</template>

<script>
export default {
  name: "FontModifier",
  data() {
    return {
      nbFontSize: 1,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss">
.font-modifier {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  border-left: 1px solid white;

  &__slider {
    width: 100%;
  }
}
</style>