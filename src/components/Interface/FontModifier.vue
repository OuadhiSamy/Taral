<template>
  <div class="font-modifier">
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
    <input
      class="font-modifier__slider"
      type="range"
      name="numberSize"
      id=""
      v-model="nbScale"
      min="0"
      max="2"
      step="0.01"
      @input="onScaleUpdate('nb', nbScale)"
    />
    {{ nbScale }}

    <input
      class="font-modifier__slider"
      type="range"
      name="numberSize"
      id=""
      v-model="nameScale"
      min="0"
      max="2"
      step="0.01"
      @input="onScaleUpdate('name', nameScale)"
    />
    {{ nameScale }}

    <div class="card-selector__list">
      <div
        class="card-selector__item"
        v-for="font in fontMap"
        :key="font.id"
        @click="changeFont(font.id)"
      >
        {{ font.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FontModifier",
  data() {
    return {
      nbScale: 1,
      nameScale: 1,
    };
  },
  computed: mapState({
    contentMap: "contentMap",
    fontMap: "fontMap",
  }),
  methods: {
    onScaleUpdate(origin, data) {
      this.$store.commit("updateScale", { type: origin, size: data });
    },
    changeCard(id) {
      this.$store.commit("updateAlphaTexture", id);
    },
    changeFont(id) {
      console.log(id);
      this.$store.commit("updateFont", id);
    }
  },
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

.card-selector {
  &__list {
    margin-bottom: 40px;
  }

  &__item {
    font-size: 32px;
    font-weight: bold;
    color: white;
    margin-top: 8px;
  }
}
</style>