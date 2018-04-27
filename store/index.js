import Vue from "vue";
import Vuex from "vuex";
import userModule from "./user";
import goalModule from "./parcel";

Vue.use(Vuex);

const store = () => {
  return new Vuex.Store({
    modules: {
      userModule,
      goalModule,
    }
  });
};

export default store;
