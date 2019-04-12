import axios from "axios";

import {
  axiosGetRequest,
  axiosPatchRequest,
  axiosPostRequest,
  axiosDeleteRequest
} from "~/common/axios-utils";
export default {
  state: {
    userGoals: {
      data: null,
      errorMessage: null,
      loading: false
    },
    linkGoalToAccount: {
      data: null,
      errorMessage: null,
      loading: false
    },
    deleteGoal: {
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
    DELETE_GOAL({ commit, rootState, state }, payload) {
      const url = `/goals/${rootState.userModule.userId}/${payload.id}.json`;
      return axiosDeleteRequest({
        commit,
        url,
        errorMessage: "Error deleting goal",
        mutation: "SET_DELETE_GOAL",
        payload
      });
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
    LINK_GOAL_TO_ACCOUNT({ commit, rootState }, payload) {
      const url = `/goals/${rootState.userModule.userId}/${payload.id}.json`;
      return axiosPatchRequest({
        commit,
        mutation: "SET_LINK_GOAL_TO_ACCOUNT",
        url,
        errorMessage: "Error updating goal",
        payload
      });
    },
    CREATE_GOAL({ commit, rootState }, payload) {
      const url = `/goals/${rootState.userModule.userId}.json`;
      return axiosPostRequest({
        commit,
        url,
        errorMessage: "Error creating goal",
        mutation: "SET_CREATE_GOAL",
        payload
      });
    }
  },
  mutations: {
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
    SET_CREATE_GOAL: (state, payload) => {
      if (payload.data) {
        state.userGoals.data.push(payload.data);
      }
      state.userGoals = {
        ...state.userGoals,
        ...payload
      };
    },
    SET_DELETE_GOAL: (state, payload) => {
      if (payload.data) {
        console.log("delete goal");
      }
      state.deleteGoal = {
        ...state.deleteGoal,
        ...payload
      };
    },
    SET_LINK_GOAL_TO_ACCOUNT: (state, payload) => {
      if (payload.data) {
        state.userGoals.data.forEach(o => {
          if (o.id === payload.data.id) {
            o = payload.data;
          }
        });
      }
      state.linkGoalToAccount = {
        ...state.linkGoalToAccount,
        ...payload
      };
    }
  }
};
