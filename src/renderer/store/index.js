import Vue from "vue";
import Vuex from "vuex";
import layout from "./modules/layout";
import router from "./modules/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    layout,
    router,
  },
});

export default store;
