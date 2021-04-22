import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberSize: 1,
    layoutArray: ['layout', 'layout2'],
    layoutTexture: null,
    alphaTexture: null,
    cameraPosition: null,
    contentMap: [
      { id: 19, name: 'sword', title: 'The Sword', rNumber: "XIX", texture: null },
      { id: 20, name: 'force', title: 'The Force', rNumber: "IX", texture: null },
    ],
    layoutMap: [
      { id: 0, name: 'layout', nbPos: { x: 1, y: 2.4 }, namePos: { x: 0, y: -2.4 }, texture: null },
      { id: 1, name: 'layout2', nbPos: { x: -1, y: 2.4 }, namePos: { x: -1, y: -2.4 }, texture: null },
    ],
    fontMap: [
      { id: 0, name: 'Elgoc_Black', font: null },
      { id: 1, name: 'Helvetica-Neue_Regular', font: null },
      { id: 2, name: 'Authentic', font: null }
    ],
    cardSettings: {
      id: 19,
      layoutId: 0,
      fontId: 0,
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
  },
  getters: {
  },
  mutations: {
    updateCamera(state, value) {
      state.cameraPosition = value;
    },
    updateAlphaTexture(state, id) {
      state.cardSettings.id = id;
      state.alphaTexture = state.contentMap.find(content => content.id === id).texture;
    },
    updateLayoutTexture(state, id) {
      state.cardSettings.layoutId = id;
      state.layoutTexture = state.layoutMap.find(layout => layout.id === id).texture;
    },
    updateFont(state, id) {
      state.cardSettings.fontId = id;
      console.log(id)
    },
    updateScale(state, o) {
      if (o.type === "nb") state.cardSettings.text.nb.size = o.size;
      if (o.type === "name") state.cardSettings.text.name.size = o.size;
    }
  },
  actions: {},
  modules: {},
});
