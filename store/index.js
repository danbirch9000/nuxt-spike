import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      parcelData: null,
      userData: null,
    },
    mutations: {
      setParcelData: (state, payload) => {
        state.parcelData = payload
      },
      setUserData: (state, payload) => {
        state.userData = payload
      }
    },
    actions: {
      getParcelData(vuexContext, context){
        return axios.get(`http://localhost:3000/parcel.json`)
        .then(data => {
          vuexContext.commit("setParcelData", data.data);
        });
      },
      getUserData(vuexContext, context){
        return axios.get(`http://localhost:3000/assets/assets/mockjson/sample.json`)
        .then(data => {
          vuexContext.commit("setUserData", data.data);
        });
      }
    }
  })
}

export default createStore
