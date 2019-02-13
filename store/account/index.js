import moment from "moment";
import axios from "axios";

export default {
  state: {
    accounts: [],
    accountIdViewing: "",
    loaded: false
  },
  actions: {
    CREATE_ACCOUNT({ rootState, commit }, payload) {
      const url = `/accounts/${rootState.userModule.userId}.json`;
      return axios
        .post(url, { name: payload.name })
        .then(response => {
          const newAccountId = response.data.name;
          console.log("created new account: ", newAccountId);
          commit("ADD_ACCOUNT", { ...payload, id: response.data.name });
          commit("SET_ACCOUNT_VIEWING", response.data.name);
          return response;
        })
        .catch(e => console.log(e));
    },
    UPDATE_ACCOUNT_VALUE({ rootState, state, commit }, payload) {
      const url = `/accounts/${rootState.userModule.userId}/${
        state.accountIdViewing
      }/history.json`;
      return axios
        .post(url, payload)
        .then(response => {
          console.log("added value to account", response.data);
          const storeValue = {
            ...payload,
            id: response.data.name
          };
          commit("UPDATE_ACCOUNT_VALUE", storeValue);
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
    DELETE_ACCOUNT({ rootState }, payload) {
      const url = `/accounts/${rootState.userModule.userId}/${
        payload.accountId
      }.json`;
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
          const accounts = response.data;
          for (const key in accounts) {
            const historyArray = [];
            for (const record in accounts[key].history) {
              historyArray.push({
                uid: record,
                date: moment(accounts[key].history[record].date).format("L LT"),
                value: accounts[key].history[record].value
              });
            }
            accountsArray.push({
              history: [...historyArray],
              name: accounts[key].name,
              id: key
            });
          }

          commit("LOAD_ALL_ACCOUNTS", accountsArray);
          return response;
        })
        .catch(() => {
          commit("SET_LOADED", true);
        });
    }
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
