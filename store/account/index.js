import Vuex from 'vuex';
import axios from 'axios';
import Cookie from "js-cookie";
import moment from 'moment';

export default {
  state: {
    accounts: [],
    accountIdViewing: ''
  },
  mutations: {
    ADD_ACCOUNT: (state, payload) => {
      state.accounts.push(payload);
    },
    LOAD_ALL_ACCOUNTS: (state, payload) => {
      state.accounts = payload
    },
    SET_ACCOUNT_VIEWING: (state, payload) => {
      state.accountIdViewing = payload
    },
    UPDATE_ACCOUNT_VALUE: (state, payload) => {
      for (const key in state.accounts) {
        if (state.accounts[key].id === state.accountIdViewing){

          state.accounts[key].history.push(payload);

          
        }
      }
    }
  },
  actions: {
    CREATE_ACCOUNT(vuexContext, payload){

      const postData = {
        ...payload,
        history: {}
      }

      return this.$axios
        .$post(
          "https://vuejs-83403.firebaseio.com/accounts/"+ vuexContext.rootState.userModule.userId +".json?auth=" +
            vuexContext.rootState.userModule.token,
            payload
        )
        .then(data => {
          vuexContext.commit("ADD_ACCOUNT", { ...payload, id: data.name});
          vuexContext.commit("SET_ACCOUNT_VIEWING", data.name);
        })
        .catch(e => console.log(e));
    },
    UPDATE_ACCOUNT_VALUE(vuexContext, payload){
      return this.$axios
        .$post(
          "https://vuejs-83403.firebaseio.com/accounts/"+ vuexContext.rootState.userModule.userId +"/"+ vuexContext.state.accountIdViewing +"/history.json?auth=" +
            vuexContext.rootState.userModule.token,
            payload
        )
        .then(data => {

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
        vuexContext.commit("LOAD_ALL_ACCOUNTS", accountsArray);
      })
      .catch(e => console.log(e));
  }
  },
  getters: {
    GET_ACCOUNT_VIEWING: (state) => {
      for (const key in state.accounts) {
        if (state.accounts[key].id === state.accountIdViewing){

          const account = state.accounts[key];
          const historyArray = [];
          for (const key in account.history) {
            historyArray.push(
              { 
                ...account.history[key], 
                id: key,
                date: moment(account.history[key].date).format('L LT')
              });
          }
          account.history = historyArray;
          return account;
        }
      }
      return null;
    }
  }
};
