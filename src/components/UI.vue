<template>
  <div id="UI">
    <nav class="nav" v-if="currentPanel === ''">
      <div class="nav__item" @click="currentPanel = 'card-selector'">Arcane</div>
      <div class="nav__item" @click="currentPanel = 'font-settings'">Font</div>
      <div class="nav__item">Layout</div>
    </nav>
    <!-- <layout-selector/> -->
    <font-modifier
      v-if="currentPanel === 'font-settings'"
      @onCloseClicked="currentPanel = ''"
    />
    <card-selector
      v-if="currentPanel === 'card-selector'"
      @onCloseClicked="currentPanel = ''"
    />
  </div>
</template>

<script>
// import LayoutSelector from './Interface/LayoutSelector.vue';
import CardSelector from "./Interface/CardSelector.vue";
import FontModifier from './Interface/FontModifier.vue';
export default {
  name: "UI",
  components: {
    // LayoutSelector,
    CardSelector,
    FontModifier
  },
  data() {
    return {
      currentPanel: "",
    };
  },
};
</script>

<style lang="scss">
.nav {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  width: 200px;

  &__item {
    color: white;
    cursor: pointer;
  }
}
</style>