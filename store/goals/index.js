import axios from "axios";
import utilities from "~/common/utilities.js";

const getValueOfAccount = function(id, userAccounts) {
  for (const key in userAccounts) {
    if (userAccounts[key].id === id) {
      const valueArray = [];
      for (const x in userAccounts[key].history) {
        valueArray.push({ ...userAccounts[key].history[x] });
      }
      return parseFloat(valueArray[valueArray.length - 1].value);
    }
  }
  return 0;
};

export default {
  state: {
    goals: [],
    goalView: {
      accounts: [],
      description: "",
      rate: "",
      amount: "",
      monthly: "",
      years: "",
      startDate: ""
    },
    loaded: false
  },
  actions: {
    GET_USER_GOALS({ rootState, commit }) {
      const url = `/goals/${rootState.userModule.userId}.json`;
      return axios
        .get(url)
        .then(data => {
          commit("SET_LOADED", true);
          const goalsArray = [];
          for (const key in data.data) {
            goalsArray.push({ ...data.data[key], id: key });
          }
          commit("SET_USER_GOALS", goalsArray);
          commit("SET_CURRENT_GOAL_VIEW", goalsArray[0]);
          return data;
        })
        .catch(() => {
          commit("SET_LOADED", true);
        });
    },
    DELETE_GOAL({ commit, rootState, state }) {
      const url = `/goals/${rootState.userModule.userId}/${
        state.goalView.id
      }.json`;
      return axios
        .delete(url)
        .then(response => {
          commit("REMOVE_GOAL", state.goalView.id);
          commit("SET_CURRENT_GOAL_VIEW", {
            description: "",
            rate: "",
            amount: "",
            monthly: "",
            years: "",
            startDate: ""
          });
          return response;
        })
        .catch(e => console.log(e));
    },
    UPDATE_GOAL({ commit, rootState, state }) {
      const url = `/goals/${rootState.userModule.userId}/${
        state.goalView.id
      }.json`;
      return axios
        .patch(url, state.goalView)
        .then(response => {
          commit("UPDATE_GOAL", state.goalView.id);
          return response;
        })
        .catch(e => console.log(e));
    },
    LINK_GOAL_TO_ACCOUNT({ commit, rootState, state }, payload) {
      var goalData = {
        ...state.goalView,
        accounts: payload
      };
      const url = `/goals/${rootState.userModule.userId}/${
        state.goalView.id
      }.json`;
      return axios
        .patch(url, goalData)
        .then(response => {
          commit("SET_CURRENT_GOAL_VIEW", state.goalView);
          commit("UPDATE_GOAL_ACCOUNTS", payload);
          return response;
        })
        .catch(e => console.log(e));
    },
    SAVE_GOAL({ commit, rootState }, goal) {
      const url = `/goals/${rootState.userModule.userId}.json`;
      return axios
        .post(url, goal)
        .then(response => {
          commit("ADD_GOAL", goal);
          commit("SET_CURRENT_GOAL_VIEW", goal);
          return response;
        })
        .catch(e => console.log(e));
    }
  },
  mutations: {
    SET_LOADED: (state, payload) => {
      state.loaded = payload;
    },
    SET_USER_GOALS: (state, payload) => {
      state.goals = payload;
    },
    ADD_GOAL: (state, payload) => {
      state.goals.push(payload);
    },
    SET_CURRENT_GOAL_VIEW: (state, payload) => {
      state.goalView = payload;
    },
    SET_CURRENT_GOAL_VIEW_RATE(state, payload) {
      state.goalView.rate = payload;
    },
    SET_CURRENT_GOAL_VIEW_MONTHLY(state, payload) {
      state.goalView.monthly = payload;
    },
    SET_CURRENT_GOAL_VIEW_YEARS(state, payload) {
      state.goalView.years = payload;
    },
    REMOVE_GOAL(state, payload) {
      for (const key in state.goals) {
        if (state.goals[key].id === payload) {
          state.goals.splice(key, 1);
        }
      }
    },
    UPDATE_GOAL(state, payload) {
      for (const key in state.goals) {
        if (state.goals[key].id === payload) {
          state.goals[key] = state.goalView;
        }
      }
    },
    UPDATE_GOAL_ACCOUNTS(state, payload) {
      var idOfGoal = state.goalView.id;
      for (const key in state.goals) {
        if (state.goals[key].id === idOfGoal) {
          state.goals[key].accounts = payload;
          state.goalView = state.goals[key];
        }
      }
    }
  },

  getters: {
    GET_CHART_DATA_CURRENT_VIEW: state => {
      if (state.goalView === undefined) {
        return null;
      }
      return {
        rate: state.goalView.rate,
        amount: state.goalView.amount,
        monthly: state.goalView.monthly,
        years: state.goalView.years,
        startDate: state.goalView.startDate
      };
    },
    GET_VALUE_OF_GOAL: (state, getters, rootState) => {
      if (state.goalView === undefined) {
        return null;
      }
      var userAccounts = rootState.accountModule.accounts;
      let value = 0;
      for (const key in state.goalView.accounts) {
        value += getValueOfAccount(state.goalView.accounts[key], userAccounts);
      }
      return value;
    },
    GET_GOAL_TARGET: state => {
      if (state.goalView === undefined) {
        return null;
      }
      let target = utilities.getFinanceData(
        state.goalView.rate,
        state.goalView.amount,
        state.goalView.monthly,
        state.goalView.years,
        state.goalView.startDate
      );

      let goalTarget = target[target.length - 1];
      return goalTarget;
    },
    GET_CHART_DATA: state => {
      if (state.goalView === undefined) {
        return null;
      }
      let data = utilities.getFinanceData(
        state.goalView.rate,
        state.goalView.amount,
        state.goalView.monthly,
        state.goalView.years,
        state.goalView.startDate
      );

      let chartData = utilities.buildChartData(data);

      return chartData;
    }
  }
};
