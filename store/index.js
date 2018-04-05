import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userData: null,
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
      setUserData: (state, payload) => {
        state.userData = payload
      },
      saveGoal: (state, payload) => {
        state.goals.push(payload);
      },
      setCurrentGoalView: (state, payload) => {
        state.goalView = payload;
      }
    },
    actions: {
      getUserData(vuexContext, context){
        return axios.get(`http://localhost:3000/assets/assets/mockjson/sample.json`)
        .then(data => {
          vuexContext.commit("setUserData", data.data);
        });
      },
      saveGoal(vuexContext, context){
        vuexContext.commit("saveGoal", context);
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
  })
}

export default createStore
