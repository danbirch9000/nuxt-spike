import Vuex from 'vuex'
import axios from 'axios'
import { urls } from "~/config/constants";

const getValueOfAccount = function (id, userAccounts) {
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
}

export default {
  state: {
    goals: [],
    goalView: {
      description: '',
      rate: '',
      amount: '',
      monthly: '',
      years: '',
      startDate: ''
    }
  },
  mutations: {
    SET_USER_GOALS: (state, payload) => {
      state.goals = payload
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
  actions: {
    GET_USER_GOALS(vuexContext, context) {
      return axios.get(`${urls.apiBaseUrl}/goals/${vuexContext.rootState.userModule.userId}.json?auth=` + vuexContext.rootState.userModule.token)
        .then(data => {
          const goalsArray = [];
          for (const key in data.data) {
            goalsArray.push({ ...data.data[key], id: key });
          }
          vuexContext.commit("SET_USER_GOALS", goalsArray);
          vuexContext.commit("SET_CURRENT_GOAL_VIEW", goalsArray[0]);
        });
    },
    DELETE_GOAL(vuexContext) {
      return this.$axios
        .$delete(
          urls.apiBaseUrl + "/goals/" + vuexContext.rootState.userModule.userId + "/" + vuexContext.state.goalView.id + ".json?auth=" +
          vuexContext.rootState.userModule.token
        )
        .then(data => {
          vuexContext.commit("REMOVE_GOAL", vuexContext.state.goalView.id);
          vuexContext.commit("SET_CURRENT_GOAL_VIEW", {
            description: '',
            rate: '',
            amount: '',
            monthly: '',
            years: '',
            startDate: ''
          });
        })
        .catch(e => console.log(e));
    },
    UPDATE_GOAL(vuexContext) {
      return this.$axios
        .$patch(
          urls.apiBaseUrl + "/goals/" + vuexContext.rootState.userModule.userId + "/" + vuexContext.state.goalView.id + ".json?auth=" +
          vuexContext.rootState.userModule.token,
          vuexContext.state.goalView
        )
        .then(data => {
          vuexContext.commit("UPDATE_GOAL", vuexContext.state.goalView.id);
        })
        .catch(e => console.log(e));
    },
    LINK_GOAL_TO_ACCOUNT(vuexContext, payload) {
      var goalData = {
        ...vuexContext.state.goalView,
        accounts: payload
      };
      return this.$axios
        .$patch(
          urls.apiBaseUrl + "/goals/" + vuexContext.rootState.userModule.userId + "/" + vuexContext.state.goalView.id + ".json?auth=" +
          vuexContext.rootState.userModule.token,
          goalData
        )
        .then(data => {
          vuexContext.commit("SET_CURRENT_GOAL_VIEW", vuexContext.state.goalView);
          vuexContext.commit("UPDATE_GOAL_ACCOUNTS", payload);
        })
        .catch(e => console.log(e));
    },
    SAVE_GOAL(vuexContext, post) {
      const goal = {
        ...post
      };
      return this.$axios
        .$post(
          urls.apiBaseUrl + "/goals/" + vuexContext.rootState.userModule.userId + ".json?auth=" +
          vuexContext.rootState.userModule.token,
          goal
        )
        .then(data => {
          vuexContext.commit("ADD_GOAL", goal);
        })
        .catch(e => console.log(e));
    }
  },
  getters: {
    GET_CHART_DATA_CURRENT_VIEW: (state) => {
      return {
        rate: state.goalView.rate,
        amount: state.goalView.amount,
        monthly: state.goalView.monthly,
        years: state.goalView.years,
        startDate: state.goalView.startDate
      }
    },
    GET_VALUE_OF_GOAL: (state, getters, rootState) => {
      var accountIds = state.goalView.accounts;
      var userAccounts = rootState.accountModule.accounts;
      let value = 0;
      for (const key in state.goalView.accounts) {
        value += getValueOfAccount(state.goalView.accounts[key], userAccounts);
      }
      return value;
    }
  }
};
