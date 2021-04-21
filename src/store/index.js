import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberSize: 1,
    layoutArray: ['layout','layout2'],
    layoutTextureArray: [],
    layoutTexture: null,
    cameraPosition: null,
    cardSettings: {
      text: {
        nb: {
          content: "XIX",
          size: 1,
          height: 1,
          font: "Elgoc",
          mode: "0"
        },
        name: {
          content: "XIX",
          size: 1,
          height: 1,
          font: "Elgoc",
        }
      }
    }
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
    updateScale (state, o) {
      if(o.type === "nb") state.cardSettings.text.nb.size = o.size;
      if(o.type === "name") state.cardSettings.text.name.size = o.size;
    }
  },
  actions: {},
  modules: {},
});
