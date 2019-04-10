import axios from "axios";

import { axiosGetRequest } from "~/common/axios-utils";
export default {
  state: {
    userGoals: {
      data: null,
      errorMessage: null,
      loading: false
    }
  },
  actions: {
    GET_USER_GOALS({ rootState, commit }) {
      const url = `/goals/${rootState.userModule.userId}.json`;
      return axiosGetRequest({
        commit,
        mutation: "SET_USER_GOALS",
        url,
        errorMessage: "Error getting user goals"
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
      if (payload.data) {
        let goal = { ...payload.data };
        let userGoals = [];
        Object.keys(goal).forEach(key => {
          userGoals.push({
            ...goal[key],
            id: key
          });
        });
        payload.data = userGoals;
      }

      state.userGoals = {
        ...state.userGoals,
        ...payload
      };
    },
    ADD_GOAL: (state, payload) => {
      state.goals.push(payload);
    },
    SET_CURRENT_GOAL_VIEW: (state, payload) => {
      state.goalView = payload;
    },
    RESET_CURRENT_GOAL_VIEW: state => {
      state.goalView = {
        accounts: [],
        description: "",
        rate: "",
        amount: "",
        monthly: "",
        years: "",
        startDate: ""
      };
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
  }
};
