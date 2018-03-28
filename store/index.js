import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      userData: null,
      goals: []
    },
    mutations: {
      setUserData: (state, payload) => {
        state.userData = payload
      },
      saveGoal: (state, payload) => {
        state.goals.push(payload);
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
    }
  })
}

export default createStore
