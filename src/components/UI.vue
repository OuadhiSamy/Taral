<template>
  <div id="UI">
    <layout-selector/>
    <font-modifier/>
    <!-- <card-selector/> -->
  </div>
</template>

<script>
import LayoutSelector from './Interface/LayoutSelector.vue';
// import CardSelector from './Interface/CardSelector.vue';
import FontModifier from './Interface/FontModifier.vue';
export default {
  name: "UI",
    components: {
    LayoutSelector,
    // CardSelector,
    FontModifier
  },
};
</script>

<style>
</style>