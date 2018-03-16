import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      parcelData: null,
    },
    mutations: {
      setParcelData: (state, payload) => {
        state.parcelData = payload
      }
    },
    actions: {
      async getParcelData ({commit, store}, id) {
        let {data} = await axios.get(`http://localhost:3000/parcel.json`)
        commit('setParcelData', data)
      }
    }
  })
}

export default createStore
