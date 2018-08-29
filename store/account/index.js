import moment from "moment";
import axios from "axios";

export default {
  state: {
    accounts: [],
    accountIdViewing: "",
    loaded: false
  },
  mutations: {
    SET_LOADED: (state, payload) => {
      state.loaded = payload;
    },
    ADD_ACCOUNT: (state, payload) => {
      state.accounts.push(payload);
    },
    LOAD_ALL_ACCOUNTS: (state, payload) => {
      state.accounts = payload;
    },
    SET_ACCOUNT_VIEWING: (state, payload) => {
      state.accountIdViewing = payload;
    },
    UPDATE_ACCOUNT_VALUE: (state, payload) => {
      for (const key in state.accounts) {
        if (state.accounts[key].id === state.accountIdViewing) {
          state.accounts[key].history.push(payload);
        }
      }
    },
    DELETE_ACCOUNT_VALUE: () => {
      console.log("mutation still needs doing");
    }
  },
  actions: {
    CREATE_ACCOUNT({ rootState, commit }, payload) {
      const url = `/accounts/${rootState.userModule.userId}.json`;
      return axios
        .post(url, payload)
        .then(response => {
          commit("ADD_ACCOUNT", { ...payload, id: response.data.name });
          commit("SET_ACCOUNT_VIEWING", response.data.name);
          return response;
        })
        .catch(e => console.log(e));
    },
    UPDATE_ACCOUNT_VALUE({ rootState, state }, payload) {
      const url = `/accounts/${rootState.userModule.userId}/${
        state.accountIdViewing
      }/history.json`;
      return axios
        .post(url, payload)
        .then(response => {
          return response;
        })
        .catch(e => console.log(e));
    },
    DELETE_ACCOUNT_VALUE({ rootState }, payload) {
      const url = `/accounts/${rootState.userModule.userId}/${
        payload.accountId
      }/history/${payload.recordId}.json`;
      return axios
        .delete(url)
        .then(response => {
          return response;
        })
        .catch(e => console.log(e));
    },
    GET_USER_ACCOUNTS({ commit, rootState }) {
      const url = `/accounts/${rootState.userModule.userId}.json`;
      return axios
        .get(url)
        .then(response => {
          commit("SET_LOADED", true);
          const accountsArray = [];
          for (const key in response.data) {
            accountsArray.push({ ...response.data[key], id: key });
          }
          commit("LOAD_ALL_ACCOUNTS", accountsArray);
          return response;
        })
        .catch(() => {
          commit("SET_LOADED", true);
        });
    }
  },
  getters: {
    GET_ACCOUNT_VIEWING: state => {
      for (const key in state.accounts) {
        if (state.accounts[key].id === state.accountIdViewing) {
          const account = state.accounts[key];
          const historyArray = [];
          for (const key in account.history) {
            historyArray.push({
              ...account.history[key],
              id: key,
              date: moment(account.history[key].date).format("L LT")
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
