<template>
  <div id="arcane-selector" class="arcane-selector">
    <smooth-scrollbar>
      <div class="arcane-selector__list">
        <div
          class="arcane-selector__item"
          v-for="card in contentMap"
          :key="card.id"
          @click="changeCard(card.id)"
        >
          {{ card.rNumber }} - {{ card.title }}
        </div>
      </div>
    </smooth-scrollbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ArcaneSelector",
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
.arcane-selector {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  // background: rgba(0, 0, 0, 0.6);

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10%;
  }

  &__item {
    color: white;
    margin-bottom: 32px;
    font-size: 96px;
    color: #686868;
    cursor: pointer;
    transition: 200ms;

    &:first-child {
      margin-top: 40vh;
    }

    &:last-child {
      margin-bottom: 40vh;
    }

    &:hover {
      color: $white;
    }

    @media (max-width: 1600px) {
      font-size: 70px;
    }

    @media (max-width: 1300px) {
      font-size: 63px;
    }

    @media (max-width: 700px) {
      font-size: 49px;
    }
  }
}

.scrollbar-track {
  opacity: 0 !important;
}
</style>