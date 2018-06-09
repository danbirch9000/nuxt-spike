import Vuex from 'vuex';
import axios from 'axios';
import Cookie from "js-cookie";
import moment from 'moment';

export default {
  state: {
    menuOpen: false
  },
  mutations: {
    TOGGLE_MENU: (state, payload) => {
        state.menuOpen = !state.menuOpen;
      },
  },
  actions: {

  }
};
