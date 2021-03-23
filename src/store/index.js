import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cameraPosition: null
  },
  mutations: {
    updateCamera (state, value) {
      state.cameraPosition = value;
    }
  },
  actions: {},
  modules: {},
});
