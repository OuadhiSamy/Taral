import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberSize: 1,
    layoutArray: ['layout', 'layout2'],
    layoutTextureArray: [],
    layoutTexture: null,
    alphaTexture: null,
    cameraPosition: null,
    contentMap: [
      { id: 19, name: 'sword', title: 'The Sword', rNumber: "XIX" },
      { id: 20, name: 'force', title: 'The Force', rNumber: "IX" },
    ],
    cardSettings: {
      id: 19,
      width: 3.8,
      height: 6,
      thickness: 0.05,
      text: {
        nb: {
          size: 1,
          height: 1,
          font: "Elgoc",
          mode: "0"
        },
        name: {
          size: 1,
          height: 1,
          font: "Elgoc",
        }
      }
    },
    alphaTextureArray: []
  },
  getters: {
  },
  mutations: {
    updateCamera(state, value) {
      state.cameraPosition = value;
    },
    updateAlphaTexture(state, id) {
      state.cardSettings.id = id;
      state.alphaTexture = state.alphaTextureArray.find(texture => texture.id === id).texture;
    },
    updateLayoutTexture(state, id) {
      state.layoutTexture = state.layoutTextureArray.find(texture => texture.id === id).texture;
    },
    updateScale(state, o) {
      if (o.type === "nb") state.cardSettings.text.nb.size = o.size;
      if (o.type === "name") state.cardSettings.text.name.size = o.size;
    }
  },
  actions: {},
  modules: {},
});
