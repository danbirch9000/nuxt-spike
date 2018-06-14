import Vuex from 'vuex';
import axios from 'axios';
import Cookie from "js-cookie";
import moment from 'moment';

export default {
  state: {
    menuOpen: false
  },
  offCanvas: {
    show: false,
    title: "",
    component: "",
    isClosable: true,
    closableMessage: null
  },
  mutations: {
    TOGGLE_MENU: (state, payload) => {
      state.menuOpen = !state.menuOpen;
    },
    CLOSE_MENU: (state, payload) => {
      state.menuOpen = false;
    },
    OPEN_OFF_CANVAS(
      state,
      { title, component, isClosable = true, closableMessage = null }
    ) {
      state.offCanvas = {
        show: true,
        title,
        component,
        isClosable,
        closableMessage
      };
    },
    CLOSE_OFF_CANVAS(state) {
      state.offCanvas.show = false;
    },
  },
  actions: {

  }
};
