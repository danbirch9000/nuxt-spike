// import moment from "moment";
import {
  axiosGetRequest,
  axiosPostRequest,
  axiosDeleteRequest
} from "~/common/axios-utils";
export default {
  state: {
    userAccounts: {
      data: null,
      errorMessage: null,
      loading: false
    },
    createUserAccount: {
      data: null,
      errorMessage: null,
      loading: false
    },
    deleteUserAccount: {
      data: null,
      errorMessage: null,
      loading: false
    },
    updateUserAccountValue: {
      data: null,
      errorMessage: null,
      loading: false
    },
    deleteUserAccountValue: {
      data: null,
      errorMessage: null,
      loading: false
    }
  },
  actions: {
    CREATE_ACCOUNT({ rootState, commit }, payload) {
      const url = `/accounts/${rootState.userModule.userId}.json`;
      return axiosPostRequest({
        commit,
        url,
        errorMessage: "Error creating account",
        mutation: "SET_CREATE_ACCOUNT",
        payload: {
          name: payload.name
        }
      });
    },
    UPDATE_USER_ACCOUNT_VALUE({ rootState, commit }, payload) {
      const url = `/accounts/${rootState.userModule.userId}/${
        payload.id
      }/history.json`;
      return axiosPostRequest({
        commit,
        url,
        errorMessage: "Error updating account value",
        mutation: "SET_UPDATE_USER_ACCOUNT_VALUE",
        payload: {
          value: payload.value,
          date: payload.date
        }
      });
    },
    DELETE_USER_ACCOUNT_VALUE({ rootState, commit }, payload) {
      const url = `/accounts/${rootState.userModule.userId}/${
        payload.accountId
      }/history/${payload.recordId}.json`;
      return axiosDeleteRequest({
        commit,
        url,
        errorMessage: "Error deleting account value",
        mutation: "SET_DELETE_USER_ACCOUNT_VALUE",
        payload
      });
    },
    DELETE_ACCOUNT({ rootState, commit }, payload) {
      const url = `/accounts/${rootState.userModule.userId}/${
        payload.accountId
      }.json`;
      return axiosDeleteRequest({
        commit,
        url,
        errorMessage: "Error deleting account",
        mutation: "SET_DELETE_ACCOUNT",
        payload
      });
    },
    GET_USER_ACCOUNTS({ commit, rootState }) {
      const url = `/accounts/${rootState.userModule.userId}.json`;
      return axiosGetRequest({
        commit,
        mutation: "SET_USER_ACCOUNTS",
        url,
        errorMessage: "Error getting user accounts"
      });
    }
  },
  mutations: {
    ADD_UPDATED_ACCOUNT_VALUE(state, payload) {
      state.userAccounts.data.forEach(o => {
        if (payload.id === o.id) {
          o.history.push({
            id: payload.recordId,
            value: payload.value,
            date: payload.date
          });
        }
      });
    },
    SET_CREATE_ACCOUNT(state, payload) {
      if (payload.data) {
        const userAccount = {
          id: payload.data.name,
          name: payload.payload.name,
          history: []
        };
        console.log(userAccount);
        state.userAccounts.data.push(userAccount);
      }
      state.createUserAccount = {
        ...state.createUserAccount,
        ...payload
      };
    },
    // SET_LOADED: (state, payload) => {
    //   state.loaded = payload;
    // },
    // ADD_ACCOUNT: (state, payload) => {
    //   state.accounts.push(payload);
    // },
    // LOAD_ALL_ACCOUNTS: (state, payload) => {
    //   state.accounts = payload;
    // },
    // SET_ACCOUNT_VIEWING: (state, payload) => {
    //   state.accountIdViewing = payload;
    // },
    // UPDATE_ACCOUNT_VALUE: (state, payload) => {
    //   for (const key in state.accounts) {
    //     if (state.accounts[key].id === state.accountIdViewing) {
    //       state.accounts[key].history.push(payload);
    //     }
    //   }
    // },
    // DELETE_ACCOUNT_VALUE: () => {
    //   console.log("mutation still needs doing");
    // },
    SET_USER_ACCOUNTS(state, payload) {
      if (payload.data) {
        let account = { ...payload.data };
        let userAccounts = [];
        Object.keys(account).forEach(key => {
          let history = [];
          if (account[key].history) {
            Object.keys(account[key].history).forEach(hKey => {
              history.push({
                date: account[key].history[hKey].date,
                value: account[key].history[hKey].value,
                id: hKey
              });
            });
          }
          userAccounts.push({
            history,
            name: account[key].name,
            id: key
          });
        });
        payload.data = userAccounts;
      }
      state.userAccounts = {
        ...state.userAccounts,
        ...payload
      };
    },
    SET_UPDATE_USER_ACCOUNT_VALUE(state, payload) {
      state.updateUserAccountValue = {
        ...state.updateUserAccountValue,
        ...payload
      };
    },
    SET_DELETE_ACCOUNT(state, payload) {
      if (payload.data) {
        state.userAccounts.data = state.userAccounts.data.filter(
          o => o.id !== payload.payload.accountId
        );
      }
      state.deleteUserAccount = {
        ...state.deleteUserAccount,
        ...payload
      };
    },
    SET_DELETE_USER_ACCOUNT_VALUE(state, payload) {
      if (payload.data) {
        state.userAccounts.data.forEach(o => {
          if (o.id === payload.payload.accountId) {
            o.history = o.history.filter(
              h => h.id !== payload.payload.recordId
            );
          }
        });
      }
      state.deleteUserAccountValue = {
        ...state.deleteUserAccountValue,
        ...payload
      };
    }
  },
  getters: {
    // GET_ACCOUNT_VIEWING: state => {
    //   for (const key in state.accounts) {
    //     if (state.accounts[key].id === state.accountIdViewing) {
    //       const account = state.accounts[key];
    //       const historyArray = [];
    //       for (const key in account.history) {
    //         historyArray.push({
    //           ...account.history[key],
    //           id: key,
    //           date: moment(account.history[key].date).format("L LT")
    //         });
    //       }
    //       account.history = historyArray;
    //       return account;
    //     }
    //   }
    //   return null;
    // }
  }
};
