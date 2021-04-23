<template>
  <div class="layout-selector">
    <div class="layout-selector__list">
      <div
        class="layout-selector__item font-anim"
        v-for="layout in layoutMap"
        :key="layout.id"
      >
        <img class="layout-selector__preview" :src="getImgUrl(layout.name)" alt="" @click="changeLayout(layout.id)" />
        <h2>{{ layout.name }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LayoutSelector",
  computed: mapState({
    layoutMap: "layoutMap",
    layoutTexture: (state) => state.layoutTexture,
  }),

  methods: {
    getImgUrl(name) {
      var images = require.context("../../assets/", false, /\.png$/);
      return images("./" + name + ".png");
    },
    changeLayout(id) {
      console.log(id);
      this.$store.commit("updateLayoutTexture", id);
    },
  },
};
</script>

<style lang="scss">
.layout-selector {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  &__list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    max-width: 1000px;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    font-weight: bold;
    margin-top: 24px;
    color: white;
    cursor: pointer;
  }

  &__preview {
    width: 100%;
    height: auto;
  }
}
</style>