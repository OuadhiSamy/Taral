import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberSize: 1,
    layoutArray: ['layout','layout2'],
    layoutTextureArray: [],
    layoutTexture: null,
    cameraPosition: null
  },
  getters: {},
  mutations: {
    updateCamera (state, value) {
      state.cameraPosition = value;
    },
    updateLayoutTexture (state, id) {
      state.layoutTexture = state.layoutTextureArray.find(texture => texture.id === id).texture;
      console.log(state.layoutTexture);
    },
    updateFontSize (state, size) {
      state.numberSize = size;
    }
  },
  actions: {},
  modules: {},
});
