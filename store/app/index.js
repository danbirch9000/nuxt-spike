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
    TOGGLE_MENU: state => {
      state.menuOpen = !state.menuOpen;
    },
    CLOSE_MENU: state => {
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
    }
  },
  actions: {}
};
