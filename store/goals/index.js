import Vuex from 'vuex'
import axios from 'axios'
import Cookie from "js-cookie";

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
        if (state.goals[key].id === payload){
          state.goals.splice(key,1);
        }
      }
    }
  },
  actions: {
    getUserGoals(vuexContext, context){
      return axios.get(`https://vuejs-83403.firebaseio.com/goals/${vuexContext.state.userId}.json?auth=` + vuexContext.state.token)
      .then(data => {
        const goalsArray = [];
        for (const key in data.data) {
          goalsArray.push({ ...data.data[key], id: key });
        }
        vuexContext.commit("SET_USER_GOALS", goalsArray);
        vuexContext.commit("SET_CURRENT_GOAL_VIEW", goalsArray[0]);
      });
    },
    deleteGoal(vuexContext){
      return this.$axios
        .$delete(
          "https://vuejs-83403.firebaseio.com/goals/"+ vuexContext.state.userId + "/" + vuexContext.state.goalView.id +".json?auth=" +
            vuexContext.state.token
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
    SAVE_GOAL(vuexContext, post){
      const goal = {
        ...post
      };
      return this.$axios
        .$post(
          "https://vuejs-83403.firebaseio.com/goals/"+ vuexContext.state.userId +".json?auth=" +
            vuexContext.state.token,
          goal
        )
        .then(data => {
          vuexContext.commit("ADD_GOAL", context);
        })
        .catch(e => console.log(e));
    }
  },
  getters: {
    getCurrentViewChartData: (state) => {
      return {
        rate: state.goalView.rate,
        amount: state.goalView.amount,
        monthly: state.goalView.monthly,
        years: state.goalView.years,
        startDate: state.goalView.startDate
      }
    }
  }
};
