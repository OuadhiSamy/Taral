import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isSceneLoaded: false,
    loadPercent: 0,
    numberSize: 1,
    layoutArray: ['layout', 'layout2'],
    layoutTexture: null,
    alphaTexture: null,
    cameraPosition: null,
    contentMap: [
      { id: 0, name: 'wheel', title: 'The Magician', rNumber: "XIX", texture: null },
      { id: 1, name: 'wheel', title: 'The High Priestess', rNumber: "IX", texture: null },
      { id: 2, name: 'wheel', title: 'The Empress', rNumber: "XIX", texture: null },
      { id: 3, name: 'wheel', title: 'The Emperor', rNumber: "IX", texture: null },
      { id: 4, name: 'wheel', title: 'The Pope', rNumber: "XIX", texture: null },
      { id: 5, name: 'wheel', title: 'The Lovers', rNumber: "IX", texture: null },
      { id: 6, name: 'wheel', title: 'The Chariot', rNumber: "XIX", texture: null },
      { id: 9, name: 'wheel', title: 'The Wheel of Fortune', rNumber: "X", texture: null },
      { id: 19, name: 'sword', title: 'The Sword', rNumber: "XIX", texture: null },
      { id: 20, name: 'force', title: 'The Force', rNumber: "IX", texture: null },
    ],
    layoutMap: [
      { id: 0, name: 'layout', nbPos: { x: 0, y: 2.6 }, namePos: { x: 0, y: -2.4 }, texture: null },
      { id: 1, name: 'layout2', nbPos: { x: 0, y: 2.4 }, namePos: { x: 0, y: -2.4 }, texture: null },
    ],
    fontMap: [
      { id: 0, name: 'Elgoc_Black', prettyName: "Elgoc", font: null },
      { id: 1, name: 'FH_Cordelia_Regular', prettyName: "FH Cordelia", font: null },
      { id: 2, name: 'Lydia_Bold', prettyName: "Lydia", font: null },
      { id: 3, name: 'Kate_Thin', prettyName: "Kate", font: null },
      { id: 4, name: 'Gilroy_ExtraBold', prettyName: "Gilroy", font: null }
    ],
    cardSettings: {
      id: 19,
      layoutId: 0,
      fontId: 0,
      width: 3.8,
      height: 6,
      displayMode: 0,
      text: {
        nb: {
          size: 1,
          height: 1,
          font: "Elgoc",
        },
        name: {
          size: 1,
          height: 1,
          font: "Elgoc",
        }
      }
    },
  },
  getters: {},
  mutations: {
    updateLoadPercent(state, value) {
      state.loadPercent = value;
    },
    updateLoadingState(state, value) {
      state.isSceneLoaded = value;
    },
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
    },
    updateMode(state, value) {
      state.cardSettings.displayMode = value;
    }
  },
  actions: {},
  modules: {},
});
