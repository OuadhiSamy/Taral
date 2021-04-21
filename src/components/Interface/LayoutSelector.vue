<template>
  <div class="layout-selector">
    <ul>
        <li class="layout-selector__item" @click="changeLayout(0)">
            Layout 1
        </li>
        <li class="layout-selector__item" @click="changeLayout(1)">
            Layout 2
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LayoutSelector",
  computed: {
      layoutTexture: state => state.layoutTexture, 
  },
  methods: {
      changeLayout(id) {
        console.log(id)
        this.$store.commit('updateLayoutTexture', id);
      }
  }
};
</script>

<style lang="scss">
.layout-selector {
    position: absolute;
    top: 40px;
    left: 40px;

    &__item {
        font-size: 30px;
        font-weight: bold;
        margin-top: 24px;
        color: white;
        cursor: pointer;
    }
}
</style>