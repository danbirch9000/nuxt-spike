import Vue from "vue";
import Vuex from "vuex";
import userModule from "./user";
import goalModule from "./goals";
import accountModule from "./account";

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    modules: {
      userModule,
      goalModule,
      accountModule
    }
  });
};

export default store;
