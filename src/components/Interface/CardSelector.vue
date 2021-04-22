<template>
  <div id="card-selector" class="card-selector">
    <div class="card-selector__close-button" @click="close()">X</div>
    <smooth-scrollbar>
      <div class="card-selector__list">
        <div
          class="card-selector__item"
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
  name: "CardSelector",
  computed: mapState({
    contentMap: "contentMap",
  }),
  methods: {
    changeCard(id) {
      console.log(id);
      this.$store.commit("updateAlphaTexture", id);
    },
    close() {
      console.log("close")
      this.$emit('onCloseClicked');
    }
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
  z-index: 2;
  // background: rgba(0, 0, 0, 0.6);

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10%;
  }

  &__close-button {
    position: absolute;
    top: 40px;
    right: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    color: $white;
    border: 1px solid $white;
    border-radius: 50%;
    cursor: pointer;
    z-index: 3;
    transition: 200ms;

    &:hover {
      color: $black;
      background-color: $white;
    }
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