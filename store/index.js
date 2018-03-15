import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      parcel: false,
    },
    mutations: {
      setParcels: (state, parcel) => {
        state.parcel = parcel.success
      }
    },
    actions: {
      async getParcels ({commit, store}, id) {
        let {data} = await axios.get(`http://localhost:3000/success.json`)
        commit('setParcels', data)
      }
    }
  })
}

export default createStore