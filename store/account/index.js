import Vuex from 'vuex'
import axios from 'axios'
import Cookie from "js-cookie";

export default {
  state: {
    accounts: []
  },
  mutations: {
    ADD_ACCOUNT: (state, payload) => {
      state.accounts.push(payload);
    },
    LOAD_ALL_ACCOUNTS: (state, payload) => {
      state.accounts = payload
    }
  },
  actions: {
    CREATE_ACCOUNT(vuexContext, payload){
      return this.$axios
        .$post(
          "https://vuejs-83403.firebaseio.com/accounts/"+ vuexContext.rootState.userModule.userId +".json?auth=" +
            vuexContext.rootState.userModule.token,
            payload
        )
        .then(data => {
          vuexContext.commit("ADD_ACCOUNT", payload);
        })
        .catch(e => console.log(e));
    },
    GET_USER_ACCOUNTS(vuexContext){
    return this.$axios
      .$get(
        "https://vuejs-83403.firebaseio.com/accounts/"+ vuexContext.rootState.userModule.userId +".json?auth=" +
          vuexContext.rootState.userModule.token
      )
      .then(data => {
        const accountsArray = [];
        for (const key in data) {
          accountsArray.push({ ...data[key], id: key });
        }
        console.log(data);
        vuexContext.commit("LOAD_ALL_ACCOUNTS", accountsArray);
      })
      .catch(e => console.log(e));
  }
  }
};
