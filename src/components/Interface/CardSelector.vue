<template>
  <div class="card-selector">
    <div class="card-selector__list">
      <div
        class="card-selector__item"
        v-for="card in contentMap"
        :key="card.id"
        @click="changeCard(card.id)"
      >
        {{ card.id }} - {{ card.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CardSelector",
  computed: mapState({
    contentMap: "contentMap",
  }),
  methods: {
    changeCard(id) {
      console.log(id);
      this.$store.commit("updateAlphaTexture", id);
    },
  },
};
</script>

<style lang="scss">
.card-selector {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);

  &__item {
    color: white;
    font-size: 32px;
    cursor: pointer;
  }
}
</style>