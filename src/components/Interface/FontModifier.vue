<template>
  <div class="font-modifier">
    <div class="font-modifier__border"></div>
    <div class="font-modifier__wrapper">
      <h1>Font Settings</h1>
      <div class="display-mode font-modifier__container">
        <h2 class="font-modifier__label">Number display mode</h2>
        <div class="display-mode__container">
          <div
            class="display-mode__item"
            :class="{ active: displayMode === 0 }"
            @click="changeMode(0)"
          >
            XIX
          </div>
          <div class="display-mode__separator"></div>
          <div
            class="display-mode__item"
            :class="{ active: displayMode === 1 }"
            @click="changeMode(1)"
          >
            19
          </div>
        </div>
      </div>

      <div class="typograhy-selector font-modifier__container">
        <h2 class="font-modifier__label">Typography</h2>
        <div class="typography-selector__list">
          <div
            class="typograhy-selector__item"
            v-for="font in fontMap"
            :key="font.id"
            :class="[
              {
                active: font.id === fontId,
                fz14: font.id === 1 || font.id === 3 || font.id === 4,
              },
            ]"
            @click="changeFont(font.id)"
            tabindex="0"
            :style="{ fontFamily: font.prettyName }"
          >
            {{ font.prettyName }}
          </div>
        </div>
      </div>

      <div class="font-modifier__container">
        <h2 class="font-modifier__label">Title Size</h2>
        <vue-slider
          class="mb"
          v-model="nameScale"
          :min="0"
          :max="2"
          :interval="0.01"
          @change="onScaleUpdate('nb', nameScale)"
        ></vue-slider>

        <h2 class="font-modifier__label">Number Size</h2>
        <vue-slider
          v-model="nbScale"
          :min="0"
          :max="2"
          :interval="0.01"
          @change="onScaleUpdate('name', nbScale)"
        ></vue-slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

export default {
  name: "FontModifier",
  components: {
    VueSlider,
  },
  data() {
    return {
      nbScale: 1,
      nameScale: 1,
    };
  },
  computed: mapState({
    contentMap: "contentMap",
    fontMap: "fontMap",
    displayMode: (state) => state.cardSettings.displayMode,
    fontId: (state) => state.cardSettings.fontId,
  }),
  methods: {
    onScaleUpdate(origin, data) {
      this.$store.commit("updateScale", { type: origin, size: data });
    },
    changeCard(id) {
      this.$store.commit("updateAlphaTexture", id);
    },
    changeFont(id) {
      this.$store.commit("updateFont", id);
    },
    changeMode(value) {
      this.$store.commit("updateMode", value);
    },
  },
};
</script>

<style lang="scss">
.mb {
  margin-bottom: 24px;
}

.font-modifier {
  display: flex;
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 40%;
  max-width: 468px;
  height: auto;

  &__border {
    width: 1px;
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &__wrapper {
    padding: 64px 64px 64px 80px;
  }

  &__container {
    margin-bottom: 40px;

    &:nth-child(3) {
      margin-bottom: 24px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__label {
    margin-bottom: 16px;
  }

  &__slider {
    width: 100%;
  }

  h1 {
    margin-bottom: 32px;
  }
}

.display-mode {
  &__container {
    display: flex;
  }

  &__separator {
    width: 1px;
    height: 18px;
    margin: 0 10px;
    background-color: $white;
    transform: rotate(35deg);
  }

  &__item {
    font-size: 18px;
    color: #818181;
    cursor: pointer;
    transition: 200ms;

    &:focus {
      outline: none;
    }

    &:hover:not(.active),
    &:focus:not(.active) {
      color: $white;
    }

    &.active {
      color: $gold;
    }
  }
}

.typograhy-selector {
  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__item {
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    color: $white;
    border: 1px solid $white;
    margin: 0 16px 16px 0;
    padding: 8px 24px;
    border-radius: 80px;
    cursor: pointer;
    transition: 200ms;

    &:focus {
      outline: none;
    }

    &:hover:not(.active),
    &:focus:not(.active) {
      color: $gold;
      border-color: $gold;
    }

    &.active {
      color: $black;
      background: $white;
    }

    &.fz14 {
      font-size: 14px;
    }
  }
}

.vue-slider {
  margin-top: 40px;
  height: 2px !important;
}

.vue-slider-dot {
  width: 28px !important;
  height: 28px !important;
}

.vue-slider-dot-handle {
  background: $black;
  border: 1px solid $white;
}

.vue-slider-rail {
  background-color: $white;
  border-radius: 0;
}

.vue-slider-process {
  background-color: $gold;
}

.vue-slider-dot-tooltip {
  visibility: initial;
}

.vue-slider-dot-tooltip-inner {
  background-color: $black;
}

.vue-slider-dot-tooltip-inner-top::after {
  display: none;
}
</style>